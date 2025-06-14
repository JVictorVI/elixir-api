defmodule ElixirApiWeb.SessionController do
  use ElixirApiWeb, :controller

  alias ElixirApi.Accounts
  alias ElixirApiWeb.Auth.Guardian # Use o alias correto para o seu módulo Guardian

  def create(conn, %{"email" => email, "password" => password}) do
    case Guardian.authenticate(email, password) do # Use Guardian.authenticate
      {:ok, user, token} -> # O authenticate retorna {:ok, user, token}
        conn
        |> put_status(:ok)
        |> render("session.json", jwt_token: token) # Use o token diretamente
      {:error, _reason} -> # _reason pode ser :unauthorized ou outro erro
        conn
        |> put_status(:unauthorized)
        |> render(ElixirApiWeb.ErrorJSON, %{message: "E-mail ou senha inválidos."})
    end
  end
end
