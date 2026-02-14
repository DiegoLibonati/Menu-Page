import { MealStore } from "@/stores/mealStore";

import allMeals from "@/constants/meals";
import breakfasts from "@/constants/breakfasts";
import lunchs from "@/constants/lunchs";
import shakes from "@/constants/shakes";

describe("MealStore", () => {
  let store: MealStore;

  beforeEach(() => {
    store = new MealStore({
      meals: allMeals,
      currentFilter: "all",
    });
  });

  it("should initialize with all meals", () => {
    const state = store.getState();

    expect(state.meals).toEqual(allMeals);
    expect(state.currentFilter).toBe("all");
  });

  it("should filter breakfast meals", () => {
    store.setCurrentFilter("breakfast");

    const state = store.getState();
    expect(state.meals).toEqual(breakfasts);
    expect(state.currentFilter).toBe("breakfast");
  });

  it("should filter lunch meals", () => {
    store.setCurrentFilter("lunch");

    const state = store.getState();
    expect(state.meals).toEqual(lunchs);
    expect(state.currentFilter).toBe("lunch");
  });

  it("should filter shake meals", () => {
    store.setCurrentFilter("shakes");

    const state = store.getState();
    expect(state.meals).toEqual(shakes);
    expect(state.currentFilter).toBe("shakes");
  });

  it("should show all meals when filter is all", () => {
    store.setCurrentFilter("breakfast");
    store.setCurrentFilter("all");

    const state = store.getState();
    expect(state.meals).toEqual(allMeals);
    expect(state.currentFilter).toBe("all");
  });

  it("should notify listeners when filter changes", () => {
    const listener = jest.fn();

    store.subscribe("meals", listener);
    store.setCurrentFilter("breakfast");

    expect(listener).toHaveBeenCalledWith(breakfasts);
  });
});
