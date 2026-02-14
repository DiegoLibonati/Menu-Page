import type { FilterId, Meal } from "@/types/app";

export interface MealState extends Record<string, unknown> {
  meals: Meal[];
  currentFilter: FilterId;
}
