defmodule ElixirApiWeb.TransactionJSON do
  alias ElixirApi.Transactions.Transaction

  @doc """
  Renders a list of transactions.
  """
  def index(%{transactions: transactions}) do
    %{data: for(transaction <- transactions, do: data(transaction))}
  end

  @doc """
  Renders a single transaction.
  """
  def show(%{transaction: transaction}) do
    %{data: data(transaction)}
  end

  defp data(%Transaction{} = transaction) do
    %{
      id: transaction.id,
      user_id: transaction.user_id,
      description: transaction.description,
      value: transaction.value,
      type: transaction.type,
      transaction_date: transaction.transaction_date,
      created_at: transaction.inserted_at,
      updated_at: transaction.updated_at
    }
  end
end
