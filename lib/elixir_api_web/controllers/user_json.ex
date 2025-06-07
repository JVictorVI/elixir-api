defmodule ElixirApiWeb.UserJSON do
  alias ElixirApi.Accounts.User
  alias ElixirApi.Transactions.Transaction

  @doc """
  Renders a list of users.
  """
  def index(%{users: users}) do
    %{data: for(user <- users, do: data(user))}
  end

  @doc """
  Renders a single user.
  """
  def show(%{user: user}) do
    %{data: data(user)}
  end

  defp data(%User{} = user) do
    %{
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      created_at: user.inserted_at,
      updated_at: user.updated_at,
      transactions: for(transaction <- user.transactions, do: transaction_data(transaction))
    }
  end

  defp transaction_data(%Transaction{} = transaction) do
    %{
      id: transaction.id,
      description: transaction.description,
      value: transaction.value,
      type: transaction.type,
      transaction_date: transaction.transaction_date,
      created_at: transaction.inserted_at,
      updated_at: transaction.updated_at
    }
  end
end
