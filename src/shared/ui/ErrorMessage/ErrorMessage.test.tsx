import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import ErrorMessage from "./ErrorMessage";

describe("ErrorMessage", () => {
  it("renders message", () => {
    render(<ErrorMessage message="Something went wrong" />);

    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
  });

  it("has role alert", () => {
    render(<ErrorMessage message="Error" />);

    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("focuses on mount", () => {
    render(<ErrorMessage message="Error" />);

    const alert = screen.getByRole("alert");
    expect(alert).toHaveFocus();
  });

  it("renders button when onClick is provided", () => {
    render(<ErrorMessage message="Error" onClick={() => {}} />);

    expect(
      screen.getByRole("button", { name: /try again/i })
    ).toBeInTheDocument();
  });

  it("does not render button when onClick is missing", () => {
    render(<ErrorMessage message="Error" />);

    expect(
      screen.queryByRole("button", { name: /try again/i })
    ).not.toBeInTheDocument();
  });

  it("calls onClick when button is clicked", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(<ErrorMessage message="Error" onClick={handleClick} />);

    const button = screen.getByRole("button", { name: /try again/i });
    await user.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});