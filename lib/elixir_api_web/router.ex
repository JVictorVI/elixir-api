defmodule ElixirApiWeb.Router do
  use ElixirApiWeb, :router

  pipeline :auth do
    plug ElixirApi.Auth.Pipeline
  end

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_live_flash
    plug :put_root_layout, html: {ElixirApiWeb.Layouts, :root}
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", ElixirApiWeb do
    pipe_through :browser
  end

  scope "/api", ElixirApiWeb do
    pipe_through :api

    post "/login", SessionController, :create
    post "/users", UserController, :create
  end


  scope "/api", ElixirApiWeb do
    pipe_through [:api, :auth]

    resources "/users", UserController, except: [:new, :edit]
    resources "/transactions", TransactionController, except: [:new, :edit]
    resources "/tags", TagController, except: [:new, :edit]
  end

  # Enable LiveDashboard and Swoosh mailbox preview in development
  if Application.compile_env(:elixir_api, :dev_routes) do
    # If you want to use the LiveDashboard in production, you should put
    # it behind authentication and allow only admins to access it.
    # If your application does not have an admins-only section yet,
    # you can use Plug.BasicAuth to set up some basic authentication
    # as long as you are also using SSL (which you should anyway).
    import Phoenix.LiveDashboard.Router

    scope "/dev" do
      pipe_through :browser

      live_dashboard "/dashboard", metrics: ElixirApiWeb.Telemetry
      forward "/mailbox", Plug.Swoosh.MailboxPreview
    end
  end
end
