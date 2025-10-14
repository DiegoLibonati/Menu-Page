import { FilterId } from "@src/entities/app";
import { MealState } from "@src/entities/states";

import { Store } from "@src/stores/store";

import allMeals from "@src/constants/meals";
import breakfasts from "@src/constants/breakfasts";
import lunchs from "@src/constants/lunchs";
import shakes from "@src/constants/shakes";

export class MealStore extends Store<MealState> {
  constructor(initialState: MealState) {
    super(initialState);
  }

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
