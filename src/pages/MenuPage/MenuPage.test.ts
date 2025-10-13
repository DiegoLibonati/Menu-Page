import { screen } from "@testing-library/dom";
import user from "@testing-library/user-event";

import { MenuPage } from "@src/pages/MenuPage/MenuPage";

import meals from "@src/constants/meals";
import breakfasts from "@src/constants/breakfasts";
import lunchs from "@src/constants/lunchs";
import shakes from "@src/constants/shakes";

type RenderComponent = {
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const container = MenuPage();
  document.body.appendChild(container);

  return {
    container: container,
  };
};

describe("MenuPage", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  describe("General Tests.", () => {
    test("It should create a main element with correct classes", () => {
      const { container } = renderComponent();

      expect(container).toBeInstanceOf(HTMLElement);
      expect(container.tagName).toBe("MAIN");
      expect(container.className).toContain("w-full");
      expect(container.className).toContain("bg-primary");
      expect(container.className).toContain("min-h-screen");
    });

    test("It should render a section element", () => {
      const { container } = renderComponent();
      const section = container.querySelector("section");

      expect(section).toBeInstanceOf(HTMLElement);
      expect(section?.className).toContain("flex");
      expect(section?.className).toContain("flex-col");
    });
  });

  describe("Header Tests.", () => {
    test("It should render the title 'Our Menu'", () => {
      renderComponent();
      const title = screen.getByRole("heading", { name: /our menu/i, level: 1 });

      expect(title).toBeInTheDocument();
      expect(title.className).toContain("text-4xl");
    });

    test("It should render a decorative line under the title", () => {
      const { container } = renderComponent();
      const line = container.querySelector("div.w-24.h-1");

      expect(line).toBeTruthy();
      expect(line?.className).toContain("rounded-lg");
      expect(line?.className).toContain("bg-secondary");
    });

    test("It should render an article header with correct structure", () => {
      const { container } = renderComponent();
      const articleHeader = container.querySelector(
        "article.flex.flex-col.items-center"
      );

      expect(articleHeader).toBeTruthy();

      const divTitle = articleHeader?.querySelector(
        "div.flex.flex-col.items-center"
      );
      expect(divTitle).toBeTruthy();

      const divFilters = articleHeader?.querySelector("div.flex.flex-row");
      expect(divFilters).toBeTruthy();
    });
  });

  describe("Filter Buttons Tests.", () => {
    test("It should render all four filter buttons", () => {
      renderComponent();
      const buttons = screen.getAllByRole("button");

      expect(buttons.length).toBe(4);
    });

    test("It should render 'All' filter button with correct attributes", () => {
      renderComponent();
      const allButton = screen.getByRole("button", { name: /all filter meal/i });

      expect(allButton).toBeInTheDocument();
      expect(allButton.id).toBe("all");
      expect(allButton.textContent).toBe("All");
    });

    test("It should render 'Breakfast' filter button with correct attributes", () => {
      renderComponent();
      const breakfastButton = screen.getByRole("button", {
        name: /breakfast filter meal/i,
      });

      expect(breakfastButton).toBeInTheDocument();
      expect(breakfastButton.id).toBe("breakfast");
      expect(breakfastButton.textContent).toBe("Breakfast");
    });

    test("It should render 'Lunch' filter button with correct attributes", () => {
      renderComponent();
      const lunchButton = screen.getByRole("button", {
        name: /lunch filter meal/i,
      });

      expect(lunchButton).toBeInTheDocument();
      expect(lunchButton.id).toBe("lunch");
      expect(lunchButton.textContent).toBe("Lunch");
    });

    test("It should render 'Shakes' filter button with correct attributes", () => {
      renderComponent();
      const shakesButton = screen.getByRole("button", {
        name: /shakes filter/i,
      });

      expect(shakesButton).toBeInTheDocument();
      expect(shakesButton.id).toBe("shakes");
      expect(shakesButton.textContent).toBe("Shakes");
    });

    test("It should render filter buttons in correct order", () => {
      renderComponent();
      const buttons = screen.getAllByRole("button");

      expect(buttons[0].id).toBe("all");
      expect(buttons[1].id).toBe("breakfast");
      expect(buttons[2].id).toBe("lunch");
      expect(buttons[3].id).toBe("shakes");
    });
  });

  describe("Meals Section Tests.", () => {
    test("It should render an article element for meals with 'meals' class", () => {
      const { container } = renderComponent();
      const mealsArticle = container.querySelector("article.meals");

      expect(mealsArticle).toBeInTheDocument();
      expect(mealsArticle?.className).toContain("flex");
      expect(mealsArticle?.className).toContain("flex-wrap");
    });

    test("It should render all meal cards from meals constant", () => {
      const { container } = renderComponent();
      const mealsArticle = container.querySelector("article.meals");
      const cards = mealsArticle?.querySelectorAll(".card-meal");

      expect(cards?.length).toBe(meals.length);
    });

    test("It should render the first meal card with correct content", () => {
      const { container } = renderComponent();
      const mealsArticle = container.querySelector("article.meals");
      const firstCard = mealsArticle?.querySelector(".card-meal");

      const h2 = firstCard?.querySelector("h2");
      const h3 = firstCard?.querySelector("h3");
      const p = firstCard?.querySelector("p");
      const img = firstCard?.querySelector("img");

      expect(h2?.textContent).toBe(meals[0].name);
      expect(h3?.textContent).toBe(meals[0].amount);
      expect(p?.textContent).toBe(meals[0].description);
      expect(img?.alt).toBe(meals[0].name);
    });

    test("It should render the last meal card with correct content", () => {
      const { container } = renderComponent();
      const mealsArticle = container.querySelector("article.meals");
      const cards = mealsArticle?.querySelectorAll(".card-meal");
      const lastCard = cards?.[cards.length - 1];

      const h2 = lastCard?.querySelector("h2");
      const h3 = lastCard?.querySelector("h3");

      expect(h2?.textContent).toBe(meals[meals.length - 1].name);
      expect(h3?.textContent).toBe(meals[meals.length - 1].amount);
    });
  });

  describe("DOM Structure Tests.", () => {
    test("It should have correct overall DOM hierarchy", () => {
      const { container } = renderComponent();

      const section = container.querySelector("section");
      expect(section?.parentElement?.tagName).toBe("MAIN");

      const articleHeader = section?.querySelector("article");
      expect(articleHeader).toBeTruthy();

      const articleMeals = section?.querySelector("article.meals");
      expect(articleMeals).toBeTruthy();

      const articles = section?.querySelectorAll("article");
      expect(articles?.length).toBe(2);
    });

    test("It should have filters container as child of header article", () => {
      const { container } = renderComponent();
      const articleHeader = container.querySelector(
        "article.flex.flex-col.items-center"
      );
      const divFilters = articleHeader?.querySelector("div.flex.flex-row.mt-6");

      expect(divFilters).toBeTruthy();

      const buttons = divFilters?.querySelectorAll("button");
      expect(buttons?.length).toBe(4);
    });
  });

  describe("Integration Tests.", () => {
    test("It should filter breakfast meals when clicking breakfast button", async () => {
      const { container } = renderComponent();
      const breakfastButton = screen.getByRole("button", {
        name: /breakfast filter meal/i,
      });
      const mealsArticle = container.querySelector("article.meals");

      await user.click(breakfastButton);

      const cards = mealsArticle?.querySelectorAll(".card-meal");
      expect(cards?.length).toBe(breakfasts.length);

      const firstCardTitle = cards?.[0].querySelector("h2");
      expect(firstCardTitle?.textContent).toBe(breakfasts[0].name);
    });

    test("It should filter lunch meals when clicking lunch button", async () => {
      const { container } = renderComponent();
      const lunchButton = screen.getByRole("button", {
        name: /lunch filter meal/i,
      });
      const mealsArticle = container.querySelector("article.meals");

      await user.click(lunchButton);

      const cards = mealsArticle?.querySelectorAll(".card-meal");
      expect(cards?.length).toBe(lunchs.length);
    });

    test("It should filter shake meals when clicking shakes button", async () => {
      const { container } = renderComponent();
      const shakesButton = screen.getByRole("button", {
        name: /shakes filter/i,
      });
      const mealsArticle = container.querySelector("article.meals");

      await user.click(shakesButton);

      const cards = mealsArticle?.querySelectorAll(".card-meal");
      expect(cards?.length).toBe(shakes.length);
    });

    test("It should show all meals when clicking 'All' button after filtering", async () => {
      const { container } = renderComponent();
      const breakfastButton = screen.getByRole("button", {
        name: /breakfast filter meal/i,
      });
      const allButton = screen.getByRole("button", { name: /all filter meal/i });
      const mealsArticle = container.querySelector("article.meals");

      await user.click(breakfastButton);
      await user.click(allButton);

      const cards = mealsArticle?.querySelectorAll(".card-meal");
      expect(cards?.length).toBe(meals.length);
    });

    test("It should update meal cards content after filtering", async () => {
      const { container } = renderComponent();
      const lunchButton = screen.getByRole("button", {
        name: /lunch filter meal/i,
      });
      const mealsArticle = container.querySelector("article.meals");

      await user.click(lunchButton);

      const cards = mealsArticle?.querySelectorAll(".card-meal");
      const firstCardTitle = cards?.[0].querySelector("h2");

      expect(firstCardTitle?.textContent).toBe(lunchs[0].name);
    });

    test("It should maintain correct meal order after multiple filter changes", async () => {
      const { container } = renderComponent();
      const breakfastButton = screen.getByRole("button", {
        name: /breakfast filter meal/i,
      });
      const shakesButton = screen.getByRole("button", {
        name: /shakes filter/i,
      });
      const allButton = screen.getByRole("button", { name: /all filter meal/i });
      const mealsArticle = container.querySelector("article.meals");

      await user.click(breakfastButton);
      await user.click(shakesButton);
      await user.click(allButton);

      const cards = mealsArticle?.querySelectorAll(".card-meal");
      const firstCardTitle = cards?.[0].querySelector("h2");

      expect(cards?.length).toBe(meals.length);
      expect(firstCardTitle?.textContent).toBe(meals[0].name);
    });
  });
});