import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import Comments from "./Comments";
import { makeMockCommentWithContent } from "../../../../shared/testing/mocks/data/commentsMocks";
import { mockPost } from "../../../../shared/testing/mocks/data/postsMocks";

// ── mocks ─────────────────────────────────────────────────────────────────────

const mockRefetch = vi.fn();

vi.mock("../../api/commentsApi", () => ({
  useGetCommentsQuery: vi.fn(),
}));

vi.mock("../../../../app/store/reduxHooks", () => ({
  useAppSelector: vi.fn(),
}));

vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: React.PropsWithChildren<object>) => (
      <div {...props}>{children}</div>
    ),
    section: ({ children, ...props }: React.PropsWithChildren<object>) => (
      <section {...props}>{children}</section>
    ),
  },
  AnimatePresence: ({ children }: React.PropsWithChildren) => <>{children}</>,
}));

vi.mock("../../../../shared/ui/Loading/Loading", () => ({
  default: ({ loadingText }: { loadingText: string }) => <p>{loadingText}</p>,
}));

vi.mock("../../../../shared/ui/ErrorMessage/ErrorMessage", () => ({
  default: ({ message, onClick }: { message: string; onClick: () => void }) => (
    <div>
      <p>{message}</p>
      <button onClick={onClick}>Retry</button>
    </div>
  ),
}));

// ── helpers ───────────────────────────────────────────────────────────────────

import { useGetCommentsQuery } from "../../api/commentsApi";
import { useAppSelector } from "../../../../app/store/reduxHooks";

const mockUseGetCommentsQuery = vi.mocked(useGetCommentsQuery);
const mockUseAppSelector = vi.mocked(useAppSelector);


function renderComments() {
  return render(
    <MemoryRouter initialEntries={["/community/123/comments"]}>
      <Routes>
        <Route path="/community/:postId/comments" element={<Comments />} />
        <Route path="/community" element={<div>Community page</div>} />
      </Routes>
    </MemoryRouter>
  );
}

// ── setup ─────────────────────────────────────────────────────────────────────


beforeEach(() => {
  mockUseGetCommentsQuery.mockReturnValue({
    data: [],
    isFetching: false,
    isError: false,
    refetch: mockRefetch,
  });

  mockUseAppSelector.mockReturnValue(mockPost);
});

afterEach(() => {
  vi.clearAllMocks();
});


// ── tests ─────────────────────────────────────────────────────────────────────

describe("Comments", () => {


  describe("time display", () => {
    beforeEach(() => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date("2024-06-01T00:00:00.000Z"));
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it("renders relative post time", () => {
      renderComments();

      expect(screen.getByLabelText(/posted 2 hours ago/i)).toBeInTheDocument();
    });
  });


  it("renders post dialog", () => {
    renderComments();
    expect(
      screen.getByRole("dialog", { name: /post window with comments/i })
    ).toBeInTheDocument();
  });

  it("renders post title", () => {
    renderComments();
    expect(screen.getByText("Test post title")).toBeInTheDocument();
  });

  it("renders post score", () => {
    renderComments();
    expect(
      screen.getByLabelText(/the score of this post is 42/i)
    ).toBeInTheDocument();
  });

  it("renders post creator link with correct href", () => {
    renderComments();

    expect(
      screen.getByRole("link", { name: /visit profile of john_doe/i })
    ).toHaveAttribute("href", "/community/123/comments/comment_creator/10");
  });

  it("renders comments count", () => {
      mockUseGetCommentsQuery.mockReturnValue({
      data: [makeMockCommentWithContent()],
      isFetching: false,
      isError: false,
      refetch: mockRefetch,
    });

    renderComments();

    expect(screen.getByText("Comments (1)")).toBeInTheDocument();
  });

  it("renders comments", () => {
      mockUseGetCommentsQuery.mockReturnValue({
      data: [makeMockCommentWithContent()],
      isFetching: false,
      isError: false,
      refetch: mockRefetch,
    });

    renderComments();

    expect(screen.getByText("Hello world")).toBeInTheDocument();
  });

  it("renders loading state for comments", () => {
    mockUseGetCommentsQuery.mockReturnValue({
      data: [],
      isFetching: true,
      isError: false,
      refetch: mockRefetch,
    });

    renderComments();

    expect(screen.getByText("Loading comments...")).toBeInTheDocument();
  });

  it("renders error state with retry button", () => {
    mockUseGetCommentsQuery.mockReturnValue({
      data: [],
      isFetching: false,
      isError: true,
      refetch: mockRefetch,
    });

    renderComments();

    expect(screen.getByText("Request failed.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /retry/i })).toBeInTheDocument();
  });

  it("calls refetch on retry click", async () => {
        const user = userEvent.setup();
    mockUseGetCommentsQuery.mockReturnValue({
      data: [],
      isFetching: false,
      isError: true,
      refetch: mockRefetch,
    });

    renderComments();

    await user.click(screen.getByRole("button", { name: /retry/i }));

    expect(mockRefetch).toHaveBeenCalledOnce();
  });

  it("renders empty state when no comments", () => {
    mockUseGetCommentsQuery.mockReturnValue({
      data: [],
      isFetching: false,
      isError: false,
      refetch: mockRefetch,
    });

    renderComments();

    expect(
      screen.getByText("This post has no comments")
    ).toBeInTheDocument();
  });

  it("renders loading post details when currentPost is null", () => {
    mockUseAppSelector.mockReturnValue(null);

    renderComments();

    expect(
      screen.getByText("Loading post details...")
    ).toBeInTheDocument();
  });

  it("closes dialog and navigates away on close button click", async () => {
    const user = userEvent.setup();
    renderComments();

    await user.click(screen.getByRole("button", { name: /close this window/i }));

    expect(
      screen.queryByRole("dialog", { name: /post window with comments/i })
    ).not.toBeInTheDocument();
  });

  it("closes dialog on Escape key", async () => {
     const user = userEvent.setup();
    renderComments();

    await user.keyboard("{Escape}");

    expect(
      screen.queryByRole("dialog", { name: /post window with comments/i })
    ).not.toBeInTheDocument();
  });
});