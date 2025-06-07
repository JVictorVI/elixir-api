defmodule ElixirApi.Repo.Migrations.CreateTransactions do
  use Ecto.Migration

  def change do
    create table(:transactions) do
      add :description, :string
      add :value, :float
      add :type, :string
      add :transaction_date, :date

      timestamps(type: :utc_datetime)
    end
  end
end
