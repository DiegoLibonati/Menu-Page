import { insertMeals } from "./helpers/insertMeals";
import { getElements } from "./helpers/getElements";

import { breakfasts } from "./constants/breakfastData";
import { lunchs } from "./constants/lunchData";
import { shakes } from "./constants/shakeData";
import { meals } from "./constants/mealData";

const onInit = () => {
  const { btnAll, btnBreakfast, btnLunch, btnShakes, mealContainer } =
    getElements();

  insertMeals(meals, mealContainer);

  btnAll.addEventListener("click", () => insertMeals(meals, mealContainer));

  btnBreakfast.addEventListener("click", () =>
    insertMeals(breakfasts, mealContainer)
  );

  btnLunch.addEventListener("click", () => insertMeals(lunchs, mealContainer));

  btnShakes.addEventListener("click", () => insertMeals(shakes, mealContainer));
};

document.addEventListener("DOMContentLoaded", onInit);
