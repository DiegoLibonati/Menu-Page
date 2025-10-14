import { ButtonFilterProps } from "@src/entities/props";
import { FilterId } from "@src/entities/app";

import { CardMeal } from "@src/components/CardMeal/CardMeal";

import breakfasts from "@src/constants/breakfasts";
import allMeals from "@src/constants/meals";
import lunchs from "@src/constants/lunchs";
import shakes from "@src/constants/shakes";

const onClick = (id: FilterId) => {
  const mealsElement = document.querySelector<HTMLElement>(".meals");

  mealsElement?.replaceChildren();

  const meals =
    id === "breakfast"
      ? breakfasts
      : id === "lunch"
      ? lunchs
      : id === "shakes"
      ? shakes
      : allMeals;

  meals.forEach((meal) => {
    const cardMeal = CardMeal({
      amount: meal.amount,
      description: meal.description,
      imgSrc: meal.imgSrc,
      name: meal.name,
    });

    mealsElement?.append(cardMeal);
  });
};

export const ButtonFilter = ({
  id,
  ariaLabel,
  text,
}: ButtonFilterProps): HTMLButtonElement => {
  const button = document.createElement("button");
  button.className =
    "border-secondary border-2 border-solid rounded-lg p-2 mx-2 cursor-pointer hover:opacity-75 active:scale-75 transition-all";
  button.id = id;
  button.setAttribute("aria-label", ariaLabel);
  button.textContent = text;

  button.addEventListener("click", () => onClick(id));

  return button;
};
