import { FilterId } from "@src/entities/app";
import { MealState } from "@src/entities/states";
import { Listener } from "@src/entities/store";

import allMeals from "@src/constants/meals";
import breakfasts from "@src/constants/breakfasts";
import lunchs from "@src/constants/lunchs";
import shakes from "@src/constants/shakes";

class MealStore {
  private state: MealState;
  private listeners: {
    [K in keyof MealState]: Listener<MealState[K]>[];
  };

  constructor(initialState: MealState) {
    this.state = initialState;
    this.listeners = {
      meals: [],
      currentFilter: [],
    };
  }

  getState(): MealState {
    return this.state;
  }

  get<K extends keyof MealState>(key: K): MealState[K] {
    return this.state[key];
  }

  setState(newState: Partial<MealState>): void {
    const prevState = this.state;
    this.state = { ...this.state, ...newState };

    (Object.keys(newState) as (keyof MealState)[]).forEach(
      <K extends keyof MealState>(key: K) => {
        const oldValue = prevState[key];
        const newValue = this.state[key];
        if (oldValue !== newValue) {
          this.listeners[key].forEach((listener) => listener(newValue));
        }
      }
    );
  }

  subscribe<K extends keyof MealState>(
    key: K,
    listener: Listener<MealState[K]>
  ): () => void {
    this.listeners[key].push(listener);

    return () => {
      const arr = this.listeners[key];
      const filtered = arr.filter((l) => l !== listener);
      (this.listeners[key] as Listener<MealState[K]>[]) = filtered;
    };
  }

  setCurrentFilter(filter: FilterId): void {
    const meals =
      filter === "breakfast"
        ? breakfasts
        : filter === "lunch"
        ? lunchs
        : filter === "shakes"
        ? shakes
        : allMeals;

    this.setState({ meals: meals, currentFilter: filter });
  }
}

export const mealStore = new MealStore({
  meals: allMeals,
  currentFilter: "all",
});
