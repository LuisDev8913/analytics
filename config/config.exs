use Mix.Config

config :plausible,
  admin_user: System.get_env("ADMIN_USER_NAME", "admin"),
  admin_email: System.get_env("ADMIN_USER_EMAIL", "admin@plausible.local"),
  mailer_email: System.get_env("MAILER_EMAIL", "hello@plausible.local"),
  admin_pwd: System.get_env("ADMIN_USER_PWD", "!@d3in"),
  ecto_repos: [Plausible.Repo],
  environment: System.get_env(Atom.to_string(Mix.env()), "dev")

config :plausible, :clickhouse,
       hostname: System.get_env("CLICKHOUSE_DATABASE_HOST", "localhost"),
       database: System.get_env("CLICKHOUSE_DATABASE_NAME", "plausible_test"),
       username: System.get_env("CLICKHOUSE_DATABASE_USER"),
       password: System.get_env("CLICKHOUSE_DATABASE_PASSWORD"),
       pool_size: 10

# Configures the endpoint
config :plausible, PlausibleWeb.Endpoint,
  url: [
    host: System.get_env("HOST", "localhost"),
    port: String.to_integer(System.get_env("PORT", "8000"))
  ],
  http: [
    port: String.to_integer(System.get_env("PORT", "8000"))
  ],
  secret_key_base:
    System.get_env(
      "SECRET_KEY_BASE",
      "/NJrhNtbyCVAsTyvtk1ZYCwfm981Vpo/0XrVwjJvemDaKC/vsvBRevLwsc6u8RCg"
    ),
  render_errors: [
    view: PlausibleWeb.ErrorView,
    accepts: ~w(html json)
  ],
  pubsub: [name: Plausible.PubSub, adapter: Phoenix.PubSub.PG2]

config :sentry,
  dsn: System.get_env("SENTRY_DSN"),
  included_environments: [:prod, :staging],
  environment_name: String.to_atom(Map.get(System.get_env(), "MIX_ENV", "dev")),
  enable_source_code_context: true,
  root_source_code_path: File.cwd!(),
  tags: %{app_version: System.get_env("APP_VERSION", "0.0.1")},
  context_lines: 5

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

config :ua_inspector,
  database_path: "priv/ua_inspector"

config :ref_inspector,
  database_path: "priv/ref_inspector"

config :plausible,
  paddle_api: Plausible.Billing.PaddleApi,
  google_api: Plausible.Google.Api

config :plausible,
  # 30 minutes
  session_timeout: 1000 * 60 * 30, # 30 minutes
  session_length_minutes: 30

config :plausible, :paddle,
  vendor_id: "49430",
  vendor_auth_code: System.get_env("PADDLE_VENDOR_AUTH_CODE")

config :plausible,
       Plausible.Repo,
       pool_size: String.to_integer(System.get_env("DATABASE_POOL_SIZE", "10")),
       timeout: 300_000,
       connect_timeout: 300_000,
       handshake_timeout: 300_000,
       url:
         System.get_env(
           "DATABASE_URL",
           "postgres://postgres:postgres@127.0.0.1:5432/plausible_test?currentSchema=default"
         ),
       ssl: false

config :plausible, :google,
  client_id: System.get_env("GOOGLE_CLIENT_ID"),
  client_secret: System.get_env("GOOGLE_CLIENT_SECRET")

config :plausible, :slack, webhook: System.get_env("SLACK_WEBHOOK")

mailer_adapter = System.get_env("MAILER_ADAPTER", "Bamboo.PostmarkAdapter")

case mailer_adapter do
  "Bamboo.PostmarkAdapter" ->
    config :plausible, Plausible.Mailer,
      adapter: :"Elixir.#{mailer_adapter}",
      api_key: System.get_env("POSTMARK_API_KEY")

  "Bamboo.SMTPAdapter" ->
    config :plausible, Plausible.Mailer,
      adapter: :"Elixir.#{mailer_adapter}",
      server: System.fetch_env!("SMTP_HOST_ADDR"),
      hostname: System.get_env("HOST", "localhost"),
      port: System.fetch_env!("SMTP_HOST_PORT"),
      username: System.fetch_env!("SMTP_USER_NAME"),
      password: System.fetch_env!("SMTP_USER_PWD"),
      tls: :if_available,
      allowed_tls_versions: [:tlsv1, :"tlsv1.1", :"tlsv1.2"],
      ssl: System.get_env("SMTP_HOST_SSL_ENABLED") || true,
      retries: System.get_env("SMTP_RETRIES") || 2,
      no_mx_lookups: System.get_env("SMTP_MX_LOOKUPS_ENABLED") || true,
      auth: :always

  _ ->
    raise "Unknown mailer_adapter; expected SMTPAdapter or PostmarkAdapter"
end

config :plausible, :twitter,
  consumer_key: System.get_env("TWITTER_CONSUMER_KEY"),
  consumer_secret: System.get_env("TWITTER_CONSUMER_SECRET"),
  token: System.get_env("TWITTER_ACCESS_TOKEN"),
  token_secret: System.get_env("TWITTER_ACCESS_TOKEN_SECRET")

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
