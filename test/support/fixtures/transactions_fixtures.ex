defmodule ElixirApi.TransactionsFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `ElixirApi.Transactions` context.
  """

  @doc """
  Generate a transaction.
  """
  def transaction_fixture(attrs \\ %{}) do
    {:ok, transaction} =
      attrs
      |> Enum.into(%{
        description: "some description",
        transaction_date: ~D[2025-06-06],
        type: "some type",
        value: 120.5
      })
      |> ElixirApi.Transactions.create_transaction()

    transaction
  end
end
