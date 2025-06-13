defmodule ElixirApiWeb.SessionController do
  use ElixirApiWeb, :controller

  alias ElixirApiWeb.Auth.Guardian

  def create(conn, %{"email" => email, "password" => password}) do
    case Guardian.authenticate(email, password) do
      {:ok, user, token} ->
        conn
        |> put_status(:ok)
        |> json(%{
          token: token,
          user: %{
            id: user.id,
            email: user.email,
            name: user.name
          }
        })

      {:error, :unauthorized} ->
        conn
        |> put_status(:unauthorized)
        |> json(%{error: "Email ou senha inválidos"})
    end
  end
end
