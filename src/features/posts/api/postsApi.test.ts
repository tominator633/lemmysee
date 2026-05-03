import { describe, it, expect } from "vitest";
import { http, HttpResponse } from "msw";
import { server } from "../../../shared/testing/mocks/node";
import { postsApi } from "./postsApi";
import { configureStore } from "@reduxjs/toolkit";

// ── helpers ───────────────────────────────────────────────────────────────────

function buildStore() {
  return configureStore({
    reducer: { [postsApi.reducerPath]: postsApi.reducer },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(postsApi.middleware),
  });
}

async function fetchPosts(communityId: string) {
  const store = buildStore();
  const promise = store.dispatch(
    postsApi.endpoints.getPostsByCommunity.initiate({ communityId })
  );
  const result = await promise;
  promise.unsubscribe();
  return result;
}

// ── testy ─────────────────────────────────────────────────────────────────────

describe("postsApi getPostsByCommunity", () => {
  it("returns mapped data on successful request", async () => {
    const result = await fetchPosts("42");

    expect(result.status).toBe("fulfilled");
    expect(result.data).toHaveLength(1);

    const post = result.data![0];
    expect(post).toMatchObject({
      id: 1,
      name: "Hello world post",
    });
  });

  it("returns empty array for communityId 'empty'", async () => {
    const result = await fetchPosts("empty");

    expect(result.status).toBe("fulfilled");
    expect(result.data).toEqual([]);
  });

  it("rejects for communityId 'error' (500)", async () => {
    const result = await fetchPosts("error");

    expect(result.status).toBe("rejected");
    expect((result as { error: { status: number } }).error.status).toBe(500);
  });

  it("rejects for empty communityId (400)", async () => {
    const result = await fetchPosts("");

    expect(result.status).toBe("rejected");
    expect((result as { error: { status: number } }).error.status).toBe(400);
  });

  it("sends correct query parameters", async () => {
    let capturedUrl: string | undefined;

    server.use(
      http.get(/\/api\/v3\/post\/list/, ({ request }) => {
        capturedUrl = request.url;
        return HttpResponse.json({ posts: [], next_page: undefined });
      })
    );

    await fetchPosts("99");

    const url = new URL(capturedUrl!);
    expect(url.searchParams.get("community_id")).toBe("99");
    expect(url.searchParams.get("sort")).toBe("Hot");
    expect(url.searchParams.get("limit")).toBe("40");
  });
});