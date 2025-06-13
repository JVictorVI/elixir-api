defmodule ElixirApi.Repo.Migrations.AddUserToTag do
  use Ecto.Migration

  def change do
    alter table(:tags) do
      add :user_id, references(:users, on_delete: :nothing)
    end
  end
end
