import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import type { Page } from "@/types/pages";

import { MenuPage } from "@/pages/MenuPage/MenuPage";

import { mealStore } from "@/stores/mealStore";

const renderPage = (): Page => {
  const container = MenuPage();
  document.body.appendChild(container);
  return container;
};

describe("MenuPage", () => {
  beforeEach(() => {
    mealStore.setCurrentFilter("all");
  });

  afterEach(() => {
    document.body.innerHTML = "";
    mealStore.setCurrentFilter("all");
  });

  it("should render the page with correct structure", () => {
    renderPage();

    const main = document.querySelector<HTMLElement>("main");
    expect(main).toBeInTheDocument();
  });

  it("should render page title", () => {
    renderPage();

    const title = screen.getByRole("heading", { name: "Our Menu" });
    expect(title).toBeInTheDocument();
  });

  it("should render all filter buttons", () => {
    renderPage();

    expect(
      screen.getByRole("button", { name: "all filter meal" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "breakfast filter meal" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "lunch filter meal" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "shakes filter meal" })
    ).toBeInTheDocument();
  });

  it("should render meal cards", () => {
    renderPage();

    const cards = document.querySelectorAll<HTMLDivElement>(".card-meal");
    expect(cards.length).toBeGreaterThan(0);
  });

  it("should filter meals when breakfast button is clicked", async () => {
    const user = userEvent.setup();
    renderPage();

    const breakfastButton = screen.getByRole("button", {
      name: "breakfast filter meal",
    });
    await user.click(breakfastButton);

    expect(mealStore.get("currentFilter")).toBe("breakfast");
  });

  it("should filter meals when lunch button is clicked", async () => {
    const user = userEvent.setup();
    renderPage();

    const lunchButton = screen.getByRole("button", {
      name: "lunch filter meal",
    });
    await user.click(lunchButton);

    expect(mealStore.get("currentFilter")).toBe("lunch");
  });

  it("should filter meals when shakes button is clicked", async () => {
    const user = userEvent.setup();
    renderPage();

    const shakesButton = screen.getByRole("button", {
      name: "shakes filter meal",
    });
    await user.click(shakesButton);

    expect(mealStore.get("currentFilter")).toBe("shakes");
  });

  it("should show all meals when all button is clicked", async () => {
    const user = userEvent.setup();
    renderPage();

    const breakfastButton = screen.getByRole("button", {
      name: "breakfast filter meal",
    });
    const allButton = screen.getByRole("button", { name: "all filter meal" });

    await user.click(breakfastButton);
    await user.click(allButton);

    expect(mealStore.get("currentFilter")).toBe("all");
  });

  it("should cleanup subscriptions and buttons on page cleanup", () => {
    const page = renderPage();

    expect(page.cleanup).toBeDefined();
    page.cleanup?.();

    expect(page.cleanup).toBeDefined();
  });
});
