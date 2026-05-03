import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Footer from "./Footer";

describe("Footer", () => {
  it("renders footer element", () => {
    render(<Footer />);

    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  it("renders copyright text", () => {
    render(<Footer />);

    expect(screen.getAllByText(/2026/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Tomas Ruzicka/i).length).toBeGreaterThan(0);
  });

  it("renders GitHub link with correct attributes", () => {
    render(<Footer />);

    const link = screen.getByRole("link", {
      name: /visit my github profile/i,
    });

    expect(link).toHaveAttribute(
      "href",
      "https://github.com/tominator633"
    );
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", expect.stringContaining("noopener"));
  });

  it("renders logo image with alt text", () => {
    render(<Footer />);

    const img = screen.getByAltText(/logo of the author/i);
    expect(img).toBeInTheDocument();
  });
});