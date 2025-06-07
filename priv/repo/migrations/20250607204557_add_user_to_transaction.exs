defmodule ElixirApi.Repo.Migrations.AddUserToTransaction do
  use Ecto.Migration

  def change do
    alter table(:transactions) do
      add :user_id, references(:users, on_delete: :nothing)
    end
  end
end
