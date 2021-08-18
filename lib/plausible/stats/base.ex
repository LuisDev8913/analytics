defmodule Plausible.Stats.Base do
  use Plausible.ClickhouseRepo
  alias Plausible.Stats.{Query, Filters}

  @no_ref "Direct / None"

  def base_event_query(site, query) do
    events_q = query_events(site, query)

    if Enum.any?(Filters.visit_props(), &query.filters["visit:" <> &1]) do
      sessions_q =
        from(
          s in query_sessions(site, query),
          select: %{session_id: s.session_id}
        )

      from(
        e in events_q,
        join: sq in subquery(sessions_q),
        on: e.session_id == sq.session_id
      )
    else
      events_q
    end
  end

  def query_events(site, query) do
    {first_datetime, last_datetime} = utc_boundaries(query, site.timezone)

    q =
      from(
        e in "events",
        hints: [sample: query.sample_threshold],
        where: e.domain == ^site.domain,
        where: e.timestamp >= ^first_datetime and e.timestamp < ^last_datetime
      )

    q =
      case query.filters["event:page"] do
        {:is, page} ->
          from(e in q, where: e.pathname == ^page)

        {:is_not, page} ->
          from(e in q, where: e.pathname != ^page)

        {:matches, glob_expr} ->
          regex = page_regex(glob_expr)
          from(e in q, where: fragment("match(?, ?)", e.pathname, ^regex))

        {:member, list} ->
          from(e in q, where: e.pathname in ^list)

        nil ->
          q
      end

    q =
      case query.filters["event:name"] do
        {:is, name} ->
          from(e in q, where: e.name == ^name)

        {:member, list} ->
          from(e in q, where: e.name in ^list)

        nil ->
          q
      end

    q =
      case query.filters["visit:goal"] do
        {:is, :page, path} ->
          from(e in q, where: e.pathname == ^path)

        {:matches, :page, expr} ->
          regex = page_regex(expr)
          from(e in q, where: fragment("match(?, ?)", e.pathname, ^regex))

        {:is, :event, event} ->
          from(e in q, where: e.name == ^event)

        nil ->
          q
      end

    Enum.reduce(query.filters, q, fn {filter_key, filter_value}, query ->
      case filter_key do
        "event:props:" <> prop_name ->
          filter_value = elem(filter_value, 1)

          if filter_value == "(none)" do
            from(
              e in query,
              where: fragment("not has(meta.key, ?)", ^prop_name)
            )
          else
            from(
              e in query,
              inner_lateral_join: meta in "meta",
              as: :meta,
              where: meta.key == ^prop_name and meta.value == ^filter_value
            )
          end

        _ ->
          query
      end
    end)
  end

  @api_prop_name_to_db %{
    "source" => "referrer_source",
    "device" => "screen_size",
    "screen" => "screen_size",
    "os" => "operating_system",
    "os_version" => "operating_system_version",
    "country" => "country_code"
  }

  def query_sessions(site, query) do
    {first_datetime, last_datetime} = utc_boundaries(query, site.timezone)

    sessions_q =
      from(
        s in "sessions",
        hints: [sample: query.sample_threshold],
        where: s.domain == ^site.domain,
        where: s.timestamp >= ^first_datetime and s.start < ^last_datetime
      )

    Enum.reduce(Filters.visit_props(), sessions_q, fn prop_name, sessions_q ->
      filter = query.filters["visit:" <> prop_name]
      prop_name = Map.get(@api_prop_name_to_db, prop_name, prop_name)

      case filter do
        {:is, value} ->
          where_target = [{String.to_existing_atom(prop_name), db_prop_val(prop_name, value)}]
          from(s in sessions_q, where: ^where_target)

        {:is_not, value} ->
          fragment_data = [
            {String.to_existing_atom(prop_name), {:!=, db_prop_val(prop_name, value)}}
          ]

          from(s in sessions_q, where: fragment(^fragment_data))

        {:member, values} ->
          list = Enum.map(values, &db_prop_val(prop_name, &1))
          fragment_data = [{String.to_existing_atom(prop_name), {:in, list}}]
          from(s in sessions_q, where: fragment(^fragment_data))

        {:matches, expr} ->
          regex = page_regex(expr)
          from(s in sessions_q, where: fragment("match(?, ?)", ^prop_name, ^regex))

        nil ->
          sessions_q

        _ ->
          raise "Unknown filter type"
      end
    end)
  end

  def select_event_metrics(q, []), do: q

  def select_event_metrics(q, ["pageviews" | rest]) do
    from(e in q,
      select_merge: %{
        "pageviews" =>
          fragment("toUInt64(round(countIf(? = 'pageview') * any(_sample_factor)))", e.name)
      }
    )
    |> select_event_metrics(rest)
  end

  def select_event_metrics(q, ["events" | rest]) do
    from(e in q,
      select_merge: %{"events" => fragment("toUInt64(round(count(*) * any(_sample_factor)))")}
    )
    |> select_event_metrics(rest)
  end

  def select_event_metrics(q, ["visitors" | rest]) do
    from(e in q,
      select_merge: %{
        "visitors" => fragment("toUInt64(round(uniq(?) * any(_sample_factor)))", e.user_id)
      }
    )
    |> select_event_metrics(rest)
  end

  def select_event_metrics(q, ["sample_percent" | rest]) do
    from(e in q,
      select_merge: %{
        "sample_percent" =>
          fragment("if(any(_sample_factor) > 1, round(100 / any(_sample_factor)), 100)")
      }
    )
    |> select_event_metrics(rest)
  end

  def select_event_metrics(_, [unknown | _]), do: raise("Unknown metric " <> unknown)

  def select_session_metrics(q, []), do: q

  def select_session_metrics(q, ["bounce_rate" | rest]) do
    from(s in q,
      select_merge: %{
        "bounce_rate" =>
          fragment("toUInt32(ifNotFinite(round(sum(is_bounce * sign) / sum(sign) * 100), 0))")
      }
    )
    |> select_session_metrics(rest)
  end

  def select_session_metrics(q, ["visits" | rest]) do
    from(s in q,
      select_merge: %{
        "visits" => fragment("toUInt64(round(sum(?) * any(_sample_factor)))", s.sign)
      }
    )
    |> select_session_metrics(rest)
  end

  def select_session_metrics(q, ["pageviews" | rest]) do
    from(s in q,
      select_merge: %{
        "pageviews" =>
          fragment("toUInt64(round(sum(? * ?) * any(_sample_factor)))", s.sign, s.pageviews)
      }
    )
    |> select_session_metrics(rest)
  end

  def select_session_metrics(q, ["visitors" | rest]) do
    from(s in q,
      select_merge: %{
        "visitors" => fragment("toUInt64(round(uniq(?) * any(_sample_factor)))", s.user_id)
      }
    )
    |> select_session_metrics(rest)
  end

  def select_session_metrics(q, ["visit_duration" | rest]) do
    from(s in q,
      select_merge: %{
        "visit_duration" => fragment("toUInt32(ifNotFinite(round(avg(duration * sign)), 0))")
      }
    )
    |> select_session_metrics(rest)
  end

  def select_session_metrics(q, ["sample_percent" | rest]) do
    from(e in q,
      select_merge: %{
        "sample_percent" =>
          fragment("if(any(_sample_factor) > 1, round(100 / any(_sample_factor)), 100)")
      }
    )
    |> select_event_metrics(rest)
  end

  defp db_prop_val("referrer_source", @no_ref), do: ""
  defp db_prop_val("utm_medium", @no_ref), do: ""
  defp db_prop_val("utm_source", @no_ref), do: ""
  defp db_prop_val("utm_campaign", @no_ref), do: ""
  defp db_prop_val(_, val), do: val

  defp utc_boundaries(%Query{period: "30m"}, _timezone) do
    last_datetime = NaiveDateTime.utc_now() |> Timex.shift(seconds: 5)
    first_datetime = NaiveDateTime.utc_now() |> Timex.shift(minutes: -30)

    {first_datetime, last_datetime}
  end

  defp utc_boundaries(%Query{date_range: date_range}, timezone) do
    {:ok, first} = NaiveDateTime.new(date_range.first, ~T[00:00:00])

    first_datetime =
      Timex.to_datetime(first, timezone)
      |> Timex.Timezone.convert("UTC")

    {:ok, last} = NaiveDateTime.new(date_range.last |> Timex.shift(days: 1), ~T[00:00:00])

    last_datetime =
      Timex.to_datetime(last, timezone)
      |> Timex.Timezone.convert("UTC")

    {first_datetime, last_datetime}
  end

  def page_regex(expr) do
    "^#{expr}\/?$"
    |> String.replace(~r/\*\*/, ".*")
    |> String.replace(~r/(?<!\.)\*/, "[^/]*")
  end
end
