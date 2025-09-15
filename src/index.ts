import { insertMeals } from "@src/helpers/insertMeals";
import { getElements } from "@src/helpers/getElements";

import { breakfasts } from "@src/constants/breakfastData";
import { lunchs } from "@src/constants/lunchData";
import { shakes } from "@src/constants/shakeData";
import { meals } from "@src/constants/mealData";

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
