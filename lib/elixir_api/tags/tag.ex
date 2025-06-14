defmodule ElixirApi.Tags.Tag do
  use Ecto.Schema
  import Ecto.Changeset

  schema "tags" do
    field :name, :string
    belongs_to :user, ElixirApi.Accounts.User
    many_to_many :transactions, ElixirApi.Transactions.Transaction,
    join_through: "tags_transactions"
    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(tag, attrs) do
    tag
    |> cast(attrs, [:name, :user_id])
    |> validate_required([:name, :user_id])
  end
end
