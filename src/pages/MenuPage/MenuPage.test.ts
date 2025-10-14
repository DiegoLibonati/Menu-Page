import { screen } from "@testing-library/dom";
import user from "@testing-library/user-event";

import { Meal } from "@src/entities/app";

import { MenuPage } from "@src/pages/MenuPage/MenuPage";

import { mealStore } from "@src/stores/mealStore";

import breakfasts from "@src/constants/breakfasts";
import lunchs from "@src/constants/lunchs";
import shakes from "@src/constants/shakes";
import allMeals from "@src/constants/meals";

const renderComponent = (): HTMLElement => {
  const container = MenuPage();
  document.body.appendChild(container);
  return container;
};

describe("MenuPage.ts", () => {
  beforeEach(() => {
    mealStore.setCurrentFilter("all");
  });

  afterEach(() => {
    document.body.innerHTML = "";
  });

  describe("General Tests.", () => {
    test("It should create a main element", () => {
      const container = renderComponent();

      expect(container).toBeInstanceOf(HTMLElement);
      expect(container.tagName).toBe("MAIN");
    });

    test("It should have correct styling classes", () => {
      const container = renderComponent();

      expect(container.className).toContain("w-full");
      expect(container.className).toContain("h-full");
      expect(container.className).toContain("min-h-screen");
      expect(container.className).toContain("bg-primary");
    });

    test("It should render sections with correct structure", () => {
      const container = renderComponent();

      const sections = container.querySelectorAll("section");
      expect(sections.length).toBe(2);
    });

    test("It should render Our Menu heading", () => {
      renderComponent();

      const heading = screen.getByText("Our Menu");
      expect(heading).toBeInTheDocument();
      expect(heading.tagName).toBe("H1");
    });

    test("It should render decorative underline", () => {
      const container = renderComponent();

      const underline = container.querySelector(".bg-secondary");
      expect(underline).toBeInTheDocument();
      expect(underline?.className).toContain("w-24");
      expect(underline?.className).toContain("h-1");
      expect(underline?.className).toContain("rounded-lg");
    });
  });

  describe("Filter buttons rendering", () => {
    test("It should render all filter buttons", () => {
      renderComponent();

      const allButton = screen.getByRole("button", { name: /all filter meal/i });
      const breakfastButton = screen.getByRole("button", { name: /breakfast filter meal/i });
      const lunchButton = screen.getByRole("button", { name: /lunch filter meal/i });
      const shakesButton = screen.getByRole("button", { name: /shakes filter meal/i });

      expect(allButton).toBeInTheDocument();
      expect(breakfastButton).toBeInTheDocument();
      expect(lunchButton).toBeInTheDocument();
      expect(shakesButton).toBeInTheDocument();
    });

    test("It should render filter buttons with correct text", () => {
      renderComponent();

      expect(screen.getByText("All")).toBeInTheDocument();
      expect(screen.getByText("Breakfast")).toBeInTheDocument();
      expect(screen.getByText("Lunch")).toBeInTheDocument();
      expect(screen.getByText("Shakes")).toBeInTheDocument();
    });

    test("It should render filter buttons with correct ids", () => {
      const container = renderComponent();

      const allButton = container.querySelector("#all");
      const breakfastButton = container.querySelector("#breakfast");
      const lunchButton = container.querySelector("#lunch");
      const shakesButton = container.querySelector("#shakes");

      expect(allButton).toBeInTheDocument();
      expect(breakfastButton).toBeInTheDocument();
      expect(lunchButton).toBeInTheDocument();
      expect(shakesButton).toBeInTheDocument();
    });

    test("It should render filters inside filters container", () => {
      const container = renderComponent();

      const filtersContainer = container.querySelector(".filters");
      const buttons = filtersContainer?.querySelectorAll("button");

      expect(buttons?.length).toBe(4);
    });
  });

  describe("Initial meals rendering", () => {
    test("It should render all meals initially", () => {
      const container = renderComponent();

      const mealsSection = container.querySelector(".meals");
      const cards = mealsSection?.querySelectorAll(".card-meal");

      expect(cards?.length).toBe(allMeals.length);
    });

    test("It should render meal cards with correct data", () => {
      renderComponent();

      allMeals.forEach((meal) => {
        expect(screen.getByText(meal.name)).toBeInTheDocument();
      });
    });

    test("It should render meals inside meals section", () => {
      const container = renderComponent();

      const mealsSection = container.querySelector(".meals");
      expect(mealsSection).toBeInTheDocument();
      expect(mealsSection?.children.length).toBeGreaterThan(0);
    });

    test("It should render meal cards with all required elements", () => {
      const container = renderComponent();

      const firstCard = container.querySelector(".card-meal");
      const img = firstCard?.querySelector("img");
      const name = firstCard?.querySelector("h2");
      const amount = firstCard?.querySelector("h3");
      const description = firstCard?.querySelector("p");

      expect(img).toBeInTheDocument();
      expect(name).toBeInTheDocument();
      expect(amount).toBeInTheDocument();
      expect(description).toBeInTheDocument();
    });
  });

  describe("Filter functionality", () => {
    test("It should filter to breakfast meals when breakfast button is clicked", async () => {
      const container = renderComponent();

      const breakfastButton = screen.getByRole("button", { name: /breakfast filter meal/i });
      await user.click(breakfastButton);

      const cards = container.querySelectorAll(".card-meal");
      expect(cards.length).toBe(breakfasts.length);
    });

    test("It should filter to lunch meals when lunch button is clicked", async () => {
      const container = renderComponent();

      const lunchButton = screen.getByRole("button", { name: /lunch filter meal/i });
      await user.click(lunchButton);

      const cards = container.querySelectorAll(".card-meal");
      expect(cards.length).toBe(lunchs.length);
    });

    test("It should filter to shake meals when shakes button is clicked", async () => {
      const container = renderComponent();

      const shakesButton = screen.getByRole("button", { name: /shakes filter meal/i });
      await user.click(shakesButton);

      const cards = container.querySelectorAll(".card-meal");
      expect(cards.length).toBe(shakes.length);
    });

    test("It should show all meals when all button is clicked", async () => {
      const container = renderComponent();

      const breakfastButton = screen.getByRole("button", { name: /breakfast filter meal/i });
      await user.click(breakfastButton);

      const allButton = screen.getByRole("button", { name: /all filter meal/i });
      await user.click(allButton);

      const cards = container.querySelectorAll(".card-meal");
      expect(cards.length).toBe(allMeals.length);
    });
  });

  describe("Meal content verification", () => {
    test("It should display correct breakfast meal names when filtered", async () => {
      renderComponent();

      const breakfastButton = screen.getByRole("button", { name: /breakfast filter meal/i });
      await user.click(breakfastButton);

      breakfasts.forEach((meal) => {
        expect(screen.getByText(meal.name)).toBeInTheDocument();
      });
    });

    test("It should display correct lunch meal names when filtered", async () => {
      renderComponent();

      const lunchButton = screen.getByRole("button", { name: /lunch filter meal/i });
      await user.click(lunchButton);

      lunchs.forEach((meal) => {
        expect(screen.getByText(meal.name)).toBeInTheDocument();
      });
    });

    test("It should display correct shake meal names when filtered", async () => {
      renderComponent();

      const shakesButton = screen.getByRole("button", { name: /shakes filter meal/i });
      await user.click(shakesButton);

      shakes.forEach((meal) => {
        expect(screen.getByText(meal.name)).toBeInTheDocument();
      });
    });

    test("It should not display breakfast meals when lunch is filtered", async () => {
      renderComponent();

      const lunchButton = screen.getByRole("button", { name: /lunch filter meal/i });
      await user.click(lunchButton);

      breakfasts.forEach((meal) => {
        expect(screen.queryByText(meal.name)).not.toBeInTheDocument();
      });
    });
  });

  describe("Store integration", () => {
    test("It should react to store changes", () => {
      const container = renderComponent();

      mealStore.setCurrentFilter("breakfast");

      const cards = container.querySelectorAll(".card-meal");
      expect(cards.length).toBe(breakfasts.length);
    });

    test("It should update meals when store state changes externally", () => {
      const container = renderComponent();

      expect(container.querySelectorAll(".card-meal").length).toBe(allMeals.length);

      mealStore.setCurrentFilter("lunch");

      expect(container.querySelectorAll(".card-meal").length).toBe(lunchs.length);
    });

    test("It should maintain subscription to store", async () => {
      const container = renderComponent();

      const breakfastButton = screen.getByRole("button", { name: /breakfast filter meal/i });
      await user.click(breakfastButton);
      expect(container.querySelectorAll(".card-meal").length).toBe(breakfasts.length);

      const lunchButton = screen.getByRole("button", { name: /lunch filter meal/i });
      await user.click(lunchButton);
      expect(container.querySelectorAll(".card-meal").length).toBe(lunchs.length);

      const shakesButton = screen.getByRole("button", { name: /shakes filter meal/i });
      await user.click(shakesButton);
      expect(container.querySelectorAll(".card-meal").length).toBe(shakes.length);
    });
  });

  describe("Multiple filter interactions", () => {
    test("It should handle switching between different filters", async () => {
      const container = renderComponent();

      const breakfastButton = screen.getByRole("button", { name: /breakfast filter meal/i });
      await user.click(breakfastButton);
      expect(container.querySelectorAll(".card-meal").length).toBe(breakfasts.length);

      const lunchButton = screen.getByRole("button", { name: /lunch filter meal/i });
      await user.click(lunchButton);
      expect(container.querySelectorAll(".card-meal").length).toBe(lunchs.length);

      const allButton = screen.getByRole("button", { name: /all filter meal/i });
      await user.click(allButton);
      expect(container.querySelectorAll(".card-meal").length).toBe(allMeals.length);
    });

    test("It should clear previous meals before rendering new ones", async () => {
      const container = renderComponent();

      const breakfastButton = screen.getByRole("button", { name: /breakfast filter meal/i });
      await user.click(breakfastButton);

      const firstFilterCards = container.querySelectorAll(".card-meal");
      expect(firstFilterCards.length).toBe(breakfasts.length);

      const lunchButton = screen.getByRole("button", { name: /lunch filter meal/i });
      await user.click(lunchButton);

      const secondFilterCards = container.querySelectorAll(".card-meal");
      expect(secondFilterCards.length).toBe(lunchs.length);
      expect(secondFilterCards.length).not.toBe(firstFilterCards.length);
    });

    test("It should handle clicking the same filter multiple times", async () => {
      const container = renderComponent();

      const breakfastButton = screen.getByRole("button", { name: /breakfast filter meal/i });

      await user.click(breakfastButton);
      await user.click(breakfastButton);
      await user.click(breakfastButton);

      const cards = container.querySelectorAll(".card-meal");
      expect(cards.length).toBe(breakfasts.length);
    });

    test("It should handle rapid filter changes", async () => {
      const container = renderComponent();

      const breakfastButton = screen.getByRole("button", { name: /breakfast filter meal/i });
      const lunchButton = screen.getByRole("button", { name: /lunch filter meal/i });
      const shakesButton = screen.getByRole("button", { name: /shakes filter meal/i });

      await user.click(breakfastButton);
      await user.click(lunchButton);
      await user.click(shakesButton);

      const cards = container.querySelectorAll(".card-meal");
      expect(cards.length).toBe(shakes.length);
    });
  });

  describe("Layout structure", () => {
    test("It should have correct section structure", () => {
      const container = renderComponent();

      const sections = container.querySelectorAll("section");
      expect(sections.length).toBe(2);

      const firstSection = sections[0];
      expect(firstSection.className).toContain("flex");
      expect(firstSection.className).toContain("flex-col");
      expect(firstSection.className).toContain("items-center");
      expect(firstSection.className).toContain("justify-center");
    });

    test("It should have filters container with correct styling", () => {
      const container = renderComponent();

      const filtersContainer = container.querySelector(".filters");
      expect(filtersContainer).toBeInTheDocument();
      expect(filtersContainer?.className).toContain("flex");
      expect(filtersContainer?.className).toContain("flex-row");
      expect(filtersContainer?.className).toContain("mt-6");
    });

    test("It should have meals section with correct styling", () => {
      const container = renderComponent();

      const mealsSection = container.querySelector(".meals");
      expect(mealsSection).toBeInTheDocument();
      expect(mealsSection?.className).toContain("flex");
      expect(mealsSection?.className).toContain("flex-row");
      expect(mealsSection?.className).toContain("flex-wrap");
      expect(mealsSection?.className).toContain("items-center");
      expect(mealsSection?.className).toContain("justify-center");
    });

    test("It should maintain structure after filtering", async () => {
      const container = renderComponent();

      const lunchButton = screen.getByRole("button", { name: /lunch filter meal/i });
      await user.click(lunchButton);

      const filtersContainer = container.querySelector(".filters");
      const mealsSection = container.querySelector(".meals");

      expect(filtersContainer).toBeInTheDocument();
      expect(mealsSection).toBeInTheDocument();
    });
  });

  describe("Edge cases", () => {
    test("It should work even if meals array is empty", () => {
      const originalMeals = mealStore.getState().meals;
      mealStore.setState({ meals: [] });

      const container = renderComponent();
      const cards = container.querySelectorAll(".card-meal");

      expect(cards.length).toBe(0);

      mealStore.setState({ meals: originalMeals });
    });

    test("It should handle store state with single meal", () => {
      const singleMeal: Meal[] = [allMeals[0]];
      mealStore.setState({ meals: singleMeal });

      const container = renderComponent();
      const cards = container.querySelectorAll(".card-meal");

      expect(cards.length).toBe(1);

      mealStore.setCurrentFilter("all");
    });

    test("It should maintain only one set of meals after multiple filters", async () => {
      const container = renderComponent();

      const breakfastButton = screen.getByRole("button", { name: /breakfast filter meal/i });
      const lunchButton = screen.getByRole("button", { name: /lunch filter meal/i });

      await user.click(breakfastButton);
      await user.click(lunchButton);

      const mealsSection = container.querySelector(".meals");
      const cards = mealsSection?.querySelectorAll(".card-meal");

      expect(cards?.length).toBe(lunchs.length);
    });
  });

  describe("Accessibility", () => {
    test("It should have accessible filter buttons", () => {
      renderComponent();

      const allButton = screen.getByRole("button", { name: /all filter meal/i });
      const breakfastButton = screen.getByRole("button", { name: /breakfast filter meal/i });
      const lunchButton = screen.getByRole("button", { name: /lunch filter meal/i });
      const shakesButton = screen.getByRole("button", { name: /shakes filter meal/i });

      expect(allButton).toHaveAttribute("aria-label");
      expect(breakfastButton).toHaveAttribute("aria-label");
      expect(lunchButton).toHaveAttribute("aria-label");
      expect(shakesButton).toHaveAttribute("aria-label");
    });

    test("It should have semantic HTML structure", () => {
      const container = renderComponent();

      expect(container.tagName).toBe("MAIN");
      expect(container.querySelector("h1")).toBeInTheDocument();
      expect(container.querySelectorAll("section").length).toBe(2);
    });

    test("It should have accessible meal cards with images", () => {
      const container = renderComponent();

      const images = container.querySelectorAll("img");
      images.forEach((img) => {
        expect(img).toHaveAttribute("alt");
      });
    });
  });

  describe("Heading structure", () => {
    test("It should have correct heading hierarchy", () => {
      renderComponent();

      const h1 = screen.getByRole("heading", { level: 1 });
      expect(h1.textContent).toBe("Our Menu");
    });

    test("It should have heading with correct styling", () => {
      renderComponent();

      const heading = screen.getByText("Our Menu");
      expect(heading.className).toContain("text-4xl");
    });
  });

  describe("Performance and memory", () => {
    test("It should replace children efficiently without memory leaks", async () => {
      const container = renderComponent();
      const mealsSection = container.querySelector(".meals");

      const breakfastButton = screen.getByRole("button", { name: /breakfast filter meal/i });
      await user.click(breakfastButton);

      const childrenAfterFirst = mealsSection?.children.length;

      await user.click(breakfastButton);
      const childrenAfterSecond = mealsSection?.children.length;

      expect(childrenAfterFirst).toBe(childrenAfterSecond);
    });

    test("It should maintain single subscription to store", async () => {
      renderComponent();

      mealStore.setCurrentFilter("breakfast");
      mealStore.setCurrentFilter("lunch");
      mealStore.setCurrentFilter("shakes");

      const cards = document.querySelectorAll(".card-meal");
      expect(cards.length).toBe(shakes.length);
    });
  });
});