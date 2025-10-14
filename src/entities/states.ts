import { FilterId, Meal } from "@src/entities/app";

export type MealState = {
  meals: Meal[];
  currentFilter: FilterId;
};
