import { Breakfast } from "../models/Breakfast";
import { Lunch } from "../models/Lunch";
import { Shake } from "../models/Shake";

export const insertMeals = <T extends Breakfast | Lunch | Shake>(
  foods: T[],
  container: HTMLElement
): void => {
  const elements = foods.map(function (food) {
    return food.insertCard();
  });

  container.replaceChildren();
  container.append(...elements);
};
