defmodule Plausible.Billing.EnterprisePlanAdmin do
  use Plausible.Repo

  def search_fields(_schema) do
    [
      :paddle_plan_id,
      user: [:name, :email]
    ]
  end

  def form_fields(_schema) do
    [
      user_id: nil,
      paddle_plan_id: nil,
      billing_interval: %{choices: [{"Yearly", "yearly"}, {"Monthly", "monthly"}]},
      monthly_pageview_limit: nil,
      site_limit: nil,
      team_member_limit: nil,
      hourly_api_request_limit: nil,
      features: nil
    ]
  end

  def custom_index_query(_conn, _schema, query) do
    from(r in query, preload: :user)
  end

  def index(_) do
    [
      id: nil,
      user_email: %{value: &get_user_email/1},
      paddle_plan_id: nil,
      billing_interval: nil,
      monthly_pageview_limit: nil,
      site_limit: nil,
      team_member_limit: nil,
      hourly_api_request_limit: nil
    ]
  end

  defp get_user_email(plan), do: plan.user.email

  def update_changeset(enterprise_plan, attrs) do
    attrs = Map.put_new(attrs, "features", [])
    Plausible.Billing.EnterprisePlan.changeset(enterprise_plan, attrs)
  end
end
