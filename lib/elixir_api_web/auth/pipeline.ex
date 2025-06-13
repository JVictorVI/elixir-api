defmodule ElixirApi.Auth.Pipeline do
  use Guardian.Plug.Pipeline,
    otp_app: :elixir_api,
    module: ElixirApiWeb.Auth.Guardian,
    error_handler: ElixirApi.Auth.ErrorHandler

  plug Guardian.Plug.VerifyHeader, realm: "Bearer"
  plug Guardian.Plug.EnsureAuthenticated
  plug Guardian.Plug.LoadResource
end
