defmodule ElixirApi.Repo.Migrations.CreateTransactionsTags do
  use Ecto.Migration

  def change do
    create table(:tags_transactions) do
      add :transaction_id, references(:transactions, on_delete: :delete_all)
      add :tag_id, references(:tags, on_delete: :delete_all)
  end

  create unique_index(:tags_transactions, [:transaction_id, :tag_id])
end

end
