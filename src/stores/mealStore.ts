import type { FilterId } from "@/types/app";
import type { MealState } from "@/types/states";

import { Store } from "@/core/store";

import allMeals from "@/constants/meals";
import breakfasts from "@/constants/breakfasts";
import lunchs from "@/constants/lunchs";
import shakes from "@/constants/shakes";

export class MealStore extends Store<MealState> {
  // constructor(initialState: MealState) {
  //   super(initialState);
  // }

  public setCurrentFilter(filter: FilterId): void {
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
