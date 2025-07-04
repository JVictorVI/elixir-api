defmodule ElixirApiWeb.TagJSON do
  alias ElixirApi.Tags.Tag

  @doc """
  Renders a list of tags.
  """
  def index(%{tags: tags}) do
    %{data: for(tag <- tags, do: data(tag))}
  end

  @doc """
  Renders a single tag.
  """
  def show(%{tag: tag}) do
    %{data: data(tag)}
  end

  defp data(%Tag{} = tag) do
    %{
      id: tag.id,
      user_id: tag.user_id,
      name: tag.name,
      created_at: tag.inserted_at,
      updated_at: tag.updated_at
    }
  end
end
