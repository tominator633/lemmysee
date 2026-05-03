import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import Header from "./Header";
import * as reduxHooks from "../../app/store/reduxHooks";

// mock Redux selector
vi.mock("../../app/store/reduxHooks", () => ({
  useAppSelector: () => [1, 2, 3], // 3 saved posts
}));

// mock CommunitiesSwiper
vi.mock(
  "../../features/communities/ui/CommunitiesSwiper/CommunitiesSwiper",
  () => ({
    default: () => <div>Swiper</div>,
  })
);

function renderHeader(initialRoute = "/12") {
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <Routes>
        <Route path="/:communityId" element={<Header />} />
        <Route path="/saved" element={<Header />} />
      </Routes>
    </MemoryRouter>
  );
}

describe("Header", () => {
  it("renders saved posts count", () => {
    renderHeader();

    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("renders search button when communityId exists", () => {
    renderHeader("/12");

    expect(
      screen.getByRole("button", { name: /open search bar/i })
    ).toBeInTheDocument();
  });

  it("opens search input on click", async () => {
    const user = userEvent.setup();
    renderHeader("/12");

    const btn = screen.getByRole("button", {
      name: /open search bar/i,
    });

    await user.click(btn);

    expect(
      screen.getByRole("textbox", { name: /search posts/i })
    ).toBeInTheDocument();
  });

  it("closes search input on close button click", async () => {
    const user = userEvent.setup();
    renderHeader("/12");

    const openBtn = screen.getByRole("button", {
      name: /open search bar/i,
    });

    await user.click(openBtn);

    const closeBtn = screen.getByRole("button", {
      name: /close search bar/i,
    });

    await user.click(closeBtn);

    expect(
      screen.queryByRole("textbox", { name: /search posts/i })
    ).not.toBeInTheDocument();
  });

  it("hides search button on /saved when no saved posts", () => {
    vi.spyOn(reduxHooks, "useAppSelector").mockReturnValueOnce([]);

  renderHeader("/saved");

  expect(
    screen.queryByRole("button", { name: /open search bar/i })
  ).not.toBeInTheDocument();
  });
});