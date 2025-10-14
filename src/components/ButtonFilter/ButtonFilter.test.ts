import { screen } from "@testing-library/dom";
import user from "@testing-library/user-event";

import { ButtonFilterProps } from "@src/entities/props";
import { FilterId } from "@src/entities/app";

import { ButtonFilter } from "@src/components/ButtonFilter/ButtonFilter";

import { mealStore } from "@src/stores/mealStore";

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

describe("ButtonFilter.ts", () => {
  beforeEach(() => {
    mealStore.setCurrentFilter("all");
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

      expect(container.className).toContain("border-secondary");
      expect(container.className).toContain("border-2");
      expect(container.className).toContain("border-solid");
      expect(container.className).toContain("rounded-lg");
      expect(container.className).toContain("p-2");
      expect(container.className).toContain("mx-2");
      expect(container.className).toContain("cursor-pointer");
    });

    test("It should have hover and active state classes", () => {
      const { container } = renderComponent(
        props.id as FilterId,
        props.ariaLabel,
        props.text
      );

      expect(container.className).toContain("hover:opacity-75");
      expect(container.className).toContain("active:scale-75");
      expect(container.className).toContain("transition-all");
    });
  });

  describe("Filter functionality", () => {
    test("It should update store to breakfast filter when clicked", async () => {
      renderComponent("breakfast", "Filter breakfast meals", "Breakfasts");

      const button = screen.getByRole("button", {
        name: /filter breakfast meals/i,
      });

      await user.click(button);

      const state = mealStore.getState();
      expect(state.currentFilter).toBe("breakfast");
      expect(state.meals).toEqual(breakfasts);
    });

    test("It should update store to lunch filter when clicked", async () => {
      renderComponent("lunch", "Filter lunch meals", "Lunch");

      const button = screen.getByRole("button", {
        name: /filter lunch meals/i,
      });

      await user.click(button);

      const state = mealStore.getState();
      expect(state.currentFilter).toBe("lunch");
      expect(state.meals).toEqual(lunchs);
    });

    test("It should update store to shakes filter when clicked", async () => {
      renderComponent("shakes", "Filter shakes", "Shakes");

      const button = screen.getByRole("button", { name: /filter shakes/i });

      await user.click(button);

      const state = mealStore.getState();
      expect(state.currentFilter).toBe("shakes");
      expect(state.meals).toEqual(shakes);
    });

    test("It should update store to all meals filter when clicked", async () => {
      renderComponent("all", "Show all meals", "All");

      const button = screen.getByRole("button", { name: /show all meals/i });

      await user.click(button);

      const state = mealStore.getState();
      expect(state.currentFilter).toBe("all");
      expect(state.meals).toEqual(allMeals);
    });
  });

  describe("Store integration", () => {
    test("It should set correct meals array in store for breakfast", async () => {
      renderComponent("breakfast", "Filter breakfast meals", "Breakfasts");
      const button = screen.getByRole("button", {
        name: /filter breakfast meals/i,
      });

      await user.click(button);

      const meals = mealStore.get("meals");
      expect(meals.length).toBe(breakfasts.length);
      expect(meals).toEqual(breakfasts);
    });

    test("It should set correct meals array in store for lunch", async () => {
      renderComponent("lunch", "Filter lunch meals", "Lunch");
      const button = screen.getByRole("button", {
        name: /filter lunch meals/i,
      });

      await user.click(button);

      const meals = mealStore.get("meals");
      expect(meals.length).toBe(lunchs.length);
      expect(meals).toEqual(lunchs);
    });

    test("It should set correct meals array in store for shakes", async () => {
      renderComponent("shakes", "Filter shakes", "Shakes");
      const button = screen.getByRole("button", { name: /filter shakes/i });

      await user.click(button);

      const meals = mealStore.get("meals");
      expect(meals.length).toBe(shakes.length);
      expect(meals).toEqual(shakes);
    });

    test("It should set correct meals array in store for all", async () => {
      renderComponent("all", "Show all meals", "All");
      const button = screen.getByRole("button", { name: /show all meals/i });

      await user.click(button);

      const meals = mealStore.get("meals");
      expect(meals.length).toBe(allMeals.length);
      expect(meals).toEqual(allMeals);
    });
  });

  describe("Multiple filter interactions", () => {
    test("It should handle switching between different filters", async () => {
      renderComponent("all", "Show all meals", "All");
      const allButton = screen.getByRole("button", { name: /show all meals/i });

      await user.click(allButton);
      expect(mealStore.getState().currentFilter).toBe("all");
      expect(mealStore.getState().meals).toEqual(allMeals);

      renderComponent("breakfast", "Filter breakfast meals", "Breakfasts");
      const breakfastButton = screen.getByRole("button", {
        name: /filter breakfast meals/i,
      });

      await user.click(breakfastButton);
      expect(mealStore.getState().currentFilter).toBe("breakfast");
      expect(mealStore.getState().meals).toEqual(breakfasts);

      await user.click(allButton);
      expect(mealStore.getState().currentFilter).toBe("all");
      expect(mealStore.getState().meals).toEqual(allMeals);
    });

    test("It should handle clicking same filter multiple times", async () => {
      renderComponent("breakfast", "Filter breakfast meals", "Breakfasts");
      const button = screen.getByRole("button", {
        name: /filter breakfast meals/i,
      });

      await user.click(button);
      await user.click(button);
      await user.click(button);

      const state = mealStore.getState();
      expect(state.currentFilter).toBe("breakfast");
      expect(state.meals).toEqual(breakfasts);
    });

    test("It should handle rapid filter changes", async () => {
      renderComponent("breakfast", "Filter breakfast meals", "Breakfasts");
      const breakfastButton = screen.getByRole("button", {
        name: /filter breakfast meals/i,
      });

      renderComponent("lunch", "Filter lunch meals", "Lunch");
      const lunchButton = screen.getByRole("button", {
        name: /filter lunch meals/i,
      });

      renderComponent("shakes", "Filter shakes", "Shakes");
      const shakesButton = screen.getByRole("button", {
        name: /filter shakes/i,
      });

      await user.click(breakfastButton);
      await user.click(lunchButton);
      await user.click(shakesButton);

      const state = mealStore.getState();
      expect(state.currentFilter).toBe("shakes");
      expect(state.meals).toEqual(shakes);
    });
  });

  describe("Filter text variations", () => {
    test("It should work with breakfast filter", () => {
      const { container } = renderComponent(
        "breakfast",
        "Filter breakfast meals",
        "Breakfasts"
      );

      expect(container.textContent).toBe("Breakfasts");
      expect(container.id).toBe("breakfast");
    });

    test("It should work with lunch filter", () => {
      const { container } = renderComponent(
        "lunch",
        "Filter lunch meals",
        "Lunch"
      );

      expect(container.textContent).toBe("Lunch");
      expect(container.id).toBe("lunch");
    });

    test("It should work with shakes filter", () => {
      const { container } = renderComponent(
        "shakes",
        "Filter shakes",
        "Shakes"
      );

      expect(container.textContent).toBe("Shakes");
      expect(container.id).toBe("shakes");
    });

    test("It should work with all filter", () => {
      const { container } = renderComponent("all", "Show all meals", "All");

      expect(container.textContent).toBe("All");
      expect(container.id).toBe("all");
    });
  });

  describe("Store state verification", () => {
    test("It should update both meals and currentFilter in store", async () => {
      renderComponent("lunch", "Filter lunch meals", "Lunch");
      const button = screen.getByRole("button", {
        name: /filter lunch meals/i,
      });

      const initialState = mealStore.getState();
      expect(initialState.currentFilter).toBe("all");

      await user.click(button);

      const updatedState = mealStore.getState();
      expect(updatedState.currentFilter).toBe("lunch");
      expect(updatedState.meals).toEqual(lunchs);
    });

    test("It should maintain store consistency after multiple clicks", async () => {
      renderComponent("breakfast", "Filter breakfast meals", "Breakfasts");
      const breakfastButton = screen.getByRole("button", {
        name: /filter breakfast meals/i,
      });

      renderComponent("lunch", "Filter lunch meals", "Lunch");
      const lunchButton = screen.getByRole("button", {
        name: /filter lunch meals/i,
      });

      await user.click(breakfastButton);
      let state = mealStore.getState();
      expect(state.currentFilter).toBe("breakfast");
      expect(state.meals.length).toBe(breakfasts.length);

      await user.click(lunchButton);
      state = mealStore.getState();
      expect(state.currentFilter).toBe("lunch");
      expect(state.meals.length).toBe(lunchs.length);
    });
  });

  describe("Edge cases", () => {
    test("It should handle empty filter text", () => {
      const { container } = renderComponent(
        "all",
        "Show all meals",
        ""
      );

      expect(container.textContent).toBe("");
      expect(container.id).toBe("all");
    });

    test("It should handle filter with special characters in text", () => {
      const { container } = renderComponent(
        "breakfast",
        "Filter breakfast meals",
        "🍳 Breakfasts"
      );

      expect(container.textContent).toBe("🍳 Breakfasts");
    });

    test("It should maintain button functionality after store reset", async () => {
      renderComponent("breakfast", "Filter breakfast meals", "Breakfasts");
      const button = screen.getByRole("button", {
        name: /filter breakfast meals/i,
      });

      await user.click(button);
      expect(mealStore.getState().currentFilter).toBe("breakfast");

      mealStore.setCurrentFilter("all");
      expect(mealStore.getState().currentFilter).toBe("all");

      await user.click(button);
      expect(mealStore.getState().currentFilter).toBe("breakfast");
    });
  });

  describe("Accessibility", () => {
    test("It should have proper aria-label for screen readers", () => {
      const { container } = renderComponent(
        "breakfast",
        "Filter breakfast meals",
        "Breakfasts"
      );

      expect(container.getAttribute("aria-label")).toBe(
        "Filter breakfast meals"
      );
    });

    test("It should be keyboard accessible", async () => {
      renderComponent("lunch", "Filter lunch meals", "Lunch");
      const button = screen.getByRole("button", {
        name: /filter lunch meals/i,
      });

      button.focus();
      expect(document.activeElement).toBe(button);
    });

    test("It should have descriptive aria-labels for all filters", () => {
      const breakfastBtn = renderComponent(
        "breakfast",
        "Filter breakfast meals",
        "Breakfasts"
      ).container;
      const lunchBtn = renderComponent(
        "lunch",
        "Filter lunch meals",
        "Lunch"
      ).container;
      const shakesBtn = renderComponent(
        "shakes",
        "Filter shakes",
        "Shakes"
      ).container;
      const allBtn = renderComponent(
        "all",
        "Show all meals",
        "All"
      ).container;

      expect(breakfastBtn.getAttribute("aria-label")).toBe(
        "Filter breakfast meals"
      );
      expect(lunchBtn.getAttribute("aria-label")).toBe("Filter lunch meals");
      expect(shakesBtn.getAttribute("aria-label")).toBe("Filter shakes");
      expect(allBtn.getAttribute("aria-label")).toBe("Show all meals");
    });
  });

  describe("Visual feedback classes", () => {
    test("It should have transition classes for smooth animations", () => {
      const { container } = renderComponent(
        "breakfast",
        "Filter breakfast meals",
        "Breakfasts"
      );

      expect(container.className).toContain("transition-all");
    });

    test("It should have cursor pointer for better UX", () => {
      const { container } = renderComponent(
        "lunch",
        "Filter lunch meals",
        "Lunch"
      );

      expect(container.className).toContain("cursor-pointer");
    });

    test("It should have hover state styling", () => {
      const { container } = renderComponent(
        "shakes",
        "Filter shakes",
        "Shakes"
      );

      expect(container.className).toContain("hover:opacity-75");
    });

    test("It should have active state styling", () => {
      const { container } = renderComponent(
        "all",
        "Show all meals",
        "All"
      );

      expect(container.className).toContain("active:scale-75");
    });
  });
});