defmodule ElixirApi.Transactions.Transaction do
  use Ecto.Schema
  import Ecto.Changeset
  import Ecto.Query

  schema "transactions" do
    field :type, :string
    field :value, :float
    field :description, :string
    field :transaction_date, :date
    belongs_to :user, ElixirApi.Accounts.User
    many_to_many :tags, ElixirApi.Tags.Tag,
    join_through: "tags_transactions",
    on_replace: :delete

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(transaction, attrs) do
  transaction
    |> cast(attrs, [:description, :value, :type, :transaction_date, :user_id])
    |> validate_required([:description, :value, :type, :transaction_date, :user_id])
    |> put_assoc(:tags, get_tags_from_ids(attrs["tag_ids"] || []))
  end

  defp get_tags_from_ids(ids) when is_list(ids) do
    from(t in ElixirApi.Tags.Tag, where: t.id in ^ids)
    |> ElixirApi.Repo.all()
  end


end
