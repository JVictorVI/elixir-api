 defmodule ElixirApi.Accounts.User do
  use Ecto.Schema
  import Ecto.Changeset

  schema "users" do
    field :name, :string
    field :password, :string
    field :email, :string
    has_many :transactions, ElixirApi.Transactions.Transaction
    has_many :tags, ElixirApi.Tags.Tag
    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:name, :email, :password])
    |> validate_required([:name, :email, :password])
    |> put_password_hash()
  end

  defp put_password_hash(%Ecto.Changeset{valid?: true, changes: %{password: password}} = changeset) do
    change(changeset, password: Bcrypt.hash_pwd_salt(password))
  end

  defp put_password_hash(changeset) do
    changeset
  end
end
