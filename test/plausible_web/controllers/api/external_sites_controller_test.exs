defmodule PlausibleWeb.Api.ExternalSitesControllerTest do
  use PlausibleWeb.ConnCase
  import Plausible.TestUtils

  setup %{conn: conn} do
    user = insert(:user)
    api_key = insert(:api_key, user: user, scopes: ["sites:provision:*"])
    conn = Plug.Conn.put_req_header(conn, "authorization", "Bearer #{api_key.key}")
    {:ok, user: user, api_key: api_key, conn: conn}
  end

  describe "POST /api/v1/sites" do
    test "can create a site", %{conn: conn} do
      conn =
        post(conn, "/api/v1/sites", %{
          "site" => %{
            "domain" => "some-site.domain",
            "timezone" => "Europe/Tallinn"
          }
        })

      assert json_response(conn, 200) == %{
               "domain" => "some-site.domain",
               "timezone" => "Europe/Tallinn"
             }
    end

    test "timezone defaults to Etc/Greenwich", %{conn: conn} do
      conn =
        post(conn, "/api/v1/sites", %{
          "site" => %{
            "domain" => "some-site.domain"
          }
        })

      assert json_response(conn, 200) == %{
               "domain" => "some-site.domain",
               "timezone" => "Etc/Greenwich"
             }
    end

    test "domain is required", %{conn: conn} do
      conn = post(conn, "/api/v1/sites", %{})

      assert json_response(conn, 400) == %{
               "error" => "domain can't be blank"
             }
    end

    test "cannot access with a bad API key scope", %{conn: conn, user: user} do
      api_key = insert(:api_key, user: user, scopes: ["stats:read:*"])

      conn =
        conn
        |> Plug.Conn.put_req_header("authorization", "Bearer #{api_key.key}")
        |> post("/api/v1/sites", %{"site" => %{"domain" => "domain.com"}})

      assert json_response(conn, 401) == %{
               "error" =>
                 "Invalid API key. Please make sure you're using a valid API key with access to the resource you've requested."
             }
    end
  end

  describe "PUT /api/v1/sites/shared-links/:link_name" do
    setup :create_site

    test "can add a shared link to a site", %{conn: conn, site: site} do
      conn = put(conn, "/api/v1/sites/#{site.domain}/shared-links/Wordpress")

      res = json_response(conn, 200)
      assert res["name"] == "Wordpress"
      assert String.starts_with?(res["url"], "http://")
    end

    test "is idempotent find or create op", %{conn: conn, site: site} do
      conn = put(conn, "/api/v1/sites/#{site.domain}/shared-links/Wordpress")

      %{"url" => url} = json_response(conn, 200)

      conn = put(conn, "/api/v1/sites/#{site.domain}/shared-links/Wordpress")

      assert %{"url" => ^url} = json_response(conn, 200)
    end
  end
end
