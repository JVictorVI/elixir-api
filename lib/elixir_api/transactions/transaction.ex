defmodule ElixirApi.Transactions.Transaction do
  use Ecto.Schema
  import Ecto.Changeset

  schema "transactions" do
    field :type, :string
    field :value, :float
    field :description, :string
    field :transaction_date, :date
    belongs_to :user, ElixirApi.Accounts.User

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(transaction, attrs) do
    transaction
    |> cast(attrs, [:description, :value, :type, :transaction_date, :user_id])
    |> validate_required([:description, :value, :type, :transaction_date, :user_id])
  end
end
