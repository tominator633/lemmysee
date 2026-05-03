import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./AppLayout";

function TestPage() {
  return <div>Test Page</div>;
}

describe("AppLayout", () => {
  it("renders header, footer and outlet", () => {
    render(
      <MemoryRouter initialEntries={["/12"]}>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/12" element={<TestPage />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Test Page")).toBeInTheDocument();
  });

  it("redirects from / to /12", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/12" element={<TestPage />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Test Page")).toBeInTheDocument();
  });
});