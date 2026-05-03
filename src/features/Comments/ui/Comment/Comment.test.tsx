import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import Comment from "./Comment";
import { makeMockCommentWithContent, makeMockReply } from "../../../../shared/testing/mocks/data/commentsMocks";
import type { Comment as CommentType } from "../../model/commentsTypes";

// ── mocks ─────────────────────────────────────────────────────────────────────

vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: React.PropsWithChildren<object>) => (
      <div {...props}>{children}</div>
    ),
  },
  AnimatePresence: ({ children }: React.PropsWithChildren) => <>{children}</>,
}));

// ── helpers ───────────────────────────────────────────────────────────────────

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date("2024-06-01T00:00:00.000Z"));
});

afterEach(() => {
  vi.useRealTimers();
});



function renderComment(overrides?: Partial<CommentType>) {
  return render(
    <MemoryRouter>
      <Comment content={makeMockCommentWithContent(overrides)} />
    </MemoryRouter>
  );
}

// ── tests ─────────────────────────────────────────────────────────────────────

describe("Comment", () => {
  it("renders author name", () => {
    renderComment();

    expect(screen.getByText("john_doe")).toBeInTheDocument();
  });

  it("renders author profile link with correct href", () => {
    renderComment();

    expect(
      screen.getByRole("link", { name: /visit profile of john_doe/i })
    ).toHaveAttribute("href", "/comment_creator/10");
  });

  it("renders relative time", () => {
    renderComment();

    expect(screen.getByText("2 hours ago")).toBeInTheDocument();
  });

  it("renders comment content", () => {
    renderComment();

    expect(screen.getByText("Hello world")).toBeInTheDocument();
  });

  it("renders score", () => {
    renderComment();

    expect(
      screen.getByLabelText(/the score of this comment is: 42/i)
    ).toBeInTheDocument();
  });

  it("falls back to 0 when score is null", () => {
    renderComment({ score: null });

    expect(
      screen.getByLabelText(/the score of this comment is: 0/i)
    ).toBeInTheDocument();
  });

  it("renders null author without crashing", () => {
    renderComment({ author: null });

    expect(screen.getByRole("article")).toBeInTheDocument();
  });

  it("does not render replies button when there are no replies", () => {
    renderComment({ replies: [] });

    expect(
      screen.queryByRole("button", { name: /expand replies/i })
    ).not.toBeInTheDocument();
  });

  it("renders replies button when replies exist", () => {
    renderComment({ replies: [makeMockReply("2", "0.1.2", "Reply")] });

    expect(
      screen.getByRole("button", { name: /expand replies/i })
    ).toBeInTheDocument();
  });

  it("shows reply count in button", () => {
    renderComment({
      replies: [
        makeMockReply("2", "0.1.2", "Reply 1"),
        makeMockReply("3", "0.1.3", "Reply 2"),
      ],
    });

    expect(screen.getByText("(2)")).toBeInTheDocument();
  });

  it("expands replies on button click", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    renderComment({ replies: [makeMockReply("2", "0.1.2", "Reply content")] });

    await user.click(screen.getByRole("button", { name: /expand replies/i }));

    expect(screen.getByText("Reply content")).toBeInTheDocument();
  });

  it("collapses replies on second button click", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    renderComment({ replies: [makeMockReply("2", "0.1.2", "Reply content")] });

    await user.click(screen.getByRole("button", { name: /expand replies/i }));
    await user.click(screen.getByRole("button", { name: /collapse replies/i }));

    expect(screen.queryByText("Reply content")).not.toBeInTheDocument();
  });

  it("renders nested reply recursively but collapsed by default", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    const nestedReply = makeMockReply("3", "0.1.2.3", "Nested reply");
    const reply = { ...makeMockReply("2", "0.1.2", "Child reply"), replies: [nestedReply] };

    renderComment({ replies: [reply] });

    await user.click(screen.getByRole("button", { name: /expand replies/i }));

    expect(screen.getByText("Child reply")).toBeInTheDocument();
    expect(screen.queryByText("Nested reply")).not.toBeInTheDocument();
  });
});