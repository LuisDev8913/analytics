defmodule Plausible.Users do
  @moduledoc """
  User context
  """

  import Ecto.Query

  alias Plausible.Auth
  alias Plausible.Billing.Subscription
  alias Plausible.Repo

  def with_subscription(%Auth.User{id: user_id} = user) do
    Repo.preload(user, subscription: last_subscription_query(user_id))
  end

  def with_subscription(user_id) when is_integer(user_id) do
    Repo.one(
      from(user in Auth.User,
        left_join: last_subscription in subquery(last_subscription_query(user_id)),
        on: last_subscription.user_id == user.id,
        left_join: subscription in Subscription,
        on: subscription.id == last_subscription.id,
        where: user.id == ^user_id,
        preload: [subscription: subscription]
      )
    )
  end

  @spec has_email_code?(Auth.User.t()) :: boolean()
  def has_email_code?(user) do
    Auth.EmailVerification.any?(user)
  end

  def allow_next_upgrade_override(%Auth.User{} = user) do
    user
    |> Auth.User.changeset(%{allow_next_upgrade_override: true})
    |> Repo.update!()
  end

  def maybe_reset_next_upgrade_override(%Auth.User{} = user) do
    if user.allow_next_upgrade_override do
      user
      |> Auth.User.changeset(%{allow_next_upgrade_override: false})
      |> Repo.update!()
    else
      user
    end
  end

  defp last_subscription_query(user_id) do
    from(subscription in Plausible.Billing.Subscription,
      where: subscription.user_id == ^user_id,
      order_by: [desc: subscription.inserted_at],
      limit: 1
    )
  end
end
