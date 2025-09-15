import { Breakfast } from "@src/models/Breakfast";
import { Lunch } from "@src/models/Lunch";
import { Shake } from "@src/models/Shake";

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
