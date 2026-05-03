import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Loading from "./Loading";

describe("Loading", () => {
  it("renders loading text", () => {
    render(<Loading loadingText="Loading data..." />);

    expect(screen.getByText("Loading data...")).toBeInTheDocument();
  });

  it("has role status", () => {
    render(<Loading loadingText="Loading..." />);

    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("has aria-busy true", () => {
    render(<Loading loadingText="Loading..." />);

    const text = screen.getByText("Loading...");
    expect(text).toHaveAttribute("aria-busy", "true");
  });

  it("renders inside status container", () => {
    render(<Loading loadingText="Loading..." />);

    const status = screen.getByRole("status");
    expect(status).toContainElement(screen.getByText("Loading..."));
  });
});