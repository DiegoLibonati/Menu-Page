export interface Meal {
  id: string;
  amount: string;
  description: string;
  imgSrc: string;
  name: string;
}

export type Breakfast = Meal;
export type Lunch = Meal;
export type Shake = Meal;

export type FilterId = "breakfast" | "all" | "lunch" | "shakes";
