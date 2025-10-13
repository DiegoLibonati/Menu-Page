import { screen } from "@testing-library/dom";
import user from "@testing-library/user-event";

import { ButtonFilterProps } from "@src/entities/props";
import { FilterId } from "@src/entities/app";

import { ButtonFilter } from "@src/components/ButtonFilter/ButtonFilter";

import breakfasts from "@src/constants/breakfasts";
import lunchs from "@src/constants/lunchs";
import shakes from "@src/constants/shakes";
import allMeals from "@src/constants/meals";

type RenderComponent = {
  props: ButtonFilterProps;
  container: HTMLButtonElement;
};

const renderComponent = (
  id: FilterId,
  ariaLabel: string,
  text: string
): RenderComponent => {
  const props: ButtonFilterProps = {
    id: id,
    ariaLabel: ariaLabel,
    text: text,
  };

  const container = ButtonFilter({
    id: props.id,
    ariaLabel: props.ariaLabel,
    text: props.text,
  });

  document.body.appendChild(container);

  return {
    props: props,
    container: container,
  };
};

describe("ButtonFilter", () => {
  let mealsContainer: HTMLElement;

  beforeEach(() => {
    mealsContainer = document.createElement("div");
    mealsContainer.classList.add("meals");
    document.body.appendChild(mealsContainer);
  });

  afterEach(() => {
    document.body.innerHTML = "";
  });

  describe("General Tests.", () => {
    const props = {
      id: "breakfast",
      ariaLabel: "Filter breakfast meals",
      text: "Breakfasts",
    };

    test("It should create a button element with correct attributes", () => {
      const { container } = renderComponent(
        props.id as FilterId,
        props.ariaLabel,
        props.text
      );

      expect(container).toBeInstanceOf(HTMLButtonElement);
      expect(container.id).toBe(props.id);
      expect(container.getAttribute("aria-label")).toBe(props.ariaLabel);
      expect(container.textContent).toBe(props.text);
      expect(container.className).toContain("border-secondary");
    });

    test("It should be accessible via screen.getByRole", () => {
      renderComponent(props.id as FilterId, props.ariaLabel, props.text);

      const button = screen.getByRole("button", { name: props.ariaLabel });

      expect(button).toBeInTheDocument();
      expect(button.textContent).toBe(props.text);
    });

    test("It should have correct styling classes", () => {
      const { container } = renderComponent(
        props.id as FilterId,
        props.ariaLabel,
        props.text
      );

      expect(container.className).toContain("border-2");
      expect(container.className).toContain("rounded-lg");
      expect(container.className).toContain("cursor-pointer");
      expect(container.className).toContain("hover:opacity-75");
    });
  });

  describe("If button is clicked", () => {
    test("It should render breakfast meals when id is 'breakfast'", async () => {
      renderComponent("breakfast", "Filter breakfast meals", "Breakfasts");

      const button = screen.getByRole("button", {
        name: /filter breakfast meals/i,
      });

      await user.click(button);

      const cards = mealsContainer.querySelectorAll(".card-meal");

      expect(cards.length).toBe(breakfasts.length);
      expect(cards[0].querySelector("h2")?.textContent).toBe(
        breakfasts[0].name
      );
      expect(cards[0].querySelector("p")?.textContent).toBe(
        breakfasts[0].description
      );
    });

    test("It should render lunch meals when id is 'lunch'", async () => {
      renderComponent("lunch", "Filter lunch meals", "Lunch");

      const button = screen.getByRole("button", {
        name: /filter lunch meals/i,
      });

      await user.click(button);

      const cards = mealsContainer.querySelectorAll(".card-meal");

      expect(cards.length).toBe(lunchs.length);
      expect(cards[0].querySelector("h2")?.textContent).toBe(lunchs[0].name);
    });

    test("It should render shake meals when id is 'shakes'", async () => {
      renderComponent("shakes", "Filter shakes", "Shakes");

      const button = screen.getByRole("button", { name: /filter shakes/i });

      await user.click(button);

      const cards = mealsContainer.querySelectorAll(".card-meal");

      expect(cards.length).toBe(shakes.length);
      expect(cards[0].querySelector("h2")?.textContent).toBe(shakes[0].name);
    });

    test("It should render all meals when id does not match any filter", async () => {
      renderComponent("all", "Show all meals", "All");

      const button = screen.getByRole("button", { name: /show all meals/i });

      await user.click(button);

      const cards = mealsContainer.querySelectorAll(".card-meal");

      expect(cards.length).toBe(allMeals.length);
      expect(cards[0].querySelector("h2")?.textContent).toBe(allMeals[0].name);
    });

    test("It should clear previous meals before rendering new ones", async () => {
      renderComponent("breakfast", "Filter breakfast meals", "Breakfasts");
      const breakfastButton = screen.getByRole("button", {
        name: /filter breakfast meals/i,
      });

      await user.click(breakfastButton);

      let cards = mealsContainer.querySelectorAll(".card-meal");
      expect(cards.length).toBe(breakfasts.length);

      renderComponent("lunch", "Filter lunch meals", "Lunch");
      const lunchButton = screen.getByRole("button", {
        name: /filter lunch meals/i,
      });

      await user.click(lunchButton);

      cards = mealsContainer.querySelectorAll(".card-meal");
      expect(cards.length).toBe(lunchs.length);
    });

    test("It should render correct meal details for each category", async () => {
      renderComponent("shakes", "Filter shakes", "Shakes");
      const button = screen.getByRole("button", { name: /filter shakes/i });

      await user.click(button);

      const cards = mealsContainer.querySelectorAll(".card-meal");

      cards.forEach((card, index) => {
        const h2 = card.querySelector("h2");
        const h3 = card.querySelector("h3");
        const p = card.querySelector("p");
        const img = card.querySelector("img");

        expect(h2?.textContent).toBe(shakes[index].name);
        expect(h3?.textContent).toBe(shakes[index].amount);
        expect(p?.textContent).toBe(shakes[index].description);
        expect(img?.alt).toBe(shakes[index].name);
      });
    });
  });

  describe("Multiple interactions", () => {
    test("It should handle multiple filter changes correctly", async () => {
      renderComponent("all", "Show all meals", "All");
      const allButton = screen.getByRole("button", { name: /show all meals/i });

      await user.click(allButton);
      let cards = mealsContainer.querySelectorAll(".card-meal");
      expect(cards.length).toBe(allMeals.length);

      renderComponent("breakfast", "Filter breakfast meals", "Breakfasts");
      const breakfastButton = screen.getByRole("button", {
        name: /filter breakfast meals/i,
      });

      await user.click(breakfastButton);
      cards = mealsContainer.querySelectorAll(".card-meal");
      expect(cards.length).toBe(breakfasts.length);

      await user.click(allButton);
      cards = mealsContainer.querySelectorAll(".card-meal");
      expect(cards.length).toBe(allMeals.length);
    });

    test("It should maintain meal container structure after filtering", async () => {
      renderComponent("lunch", "Filter lunch meals", "Lunch");
      const button = screen.getByRole("button", {
        name: /filter lunch meals/i,
      });

      await user.click(button);

      const mealsArticle = document.querySelector(".meals");
      expect(mealsArticle).toBeInTheDocument();
      expect(mealsArticle?.classList.contains("meals")).toBe(true);
    });
  });

  describe("Edge cases", () => {
    test("It should handle clicking the same filter multiple times", async () => {
      renderComponent("breakfast", "Filter breakfast meals", "Breakfasts");
      const button = screen.getByRole("button", {
        name: /filter breakfast meals/i,
      });

      await user.click(button);
      await user.click(button);
      await user.click(button);

      const cards = mealsContainer.querySelectorAll(".card-meal");
      expect(cards.length).toBe(breakfasts.length);
    });

    test("It should work even if meals container is empty initially", async () => {
      expect(mealsContainer.children.length).toBe(0);

      renderComponent("shakes", "Filter shakes", "Shakes");
      const button = screen.getByRole("button", { name: /filter shakes/i });

      await user.click(button);

      const cards = mealsContainer.querySelectorAll(".card-meal");
      expect(cards.length).toBe(shakes.length);
    });
  });
});
