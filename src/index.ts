import {
  btnAll,
  btnBreakfast,
  btnLunch,
  btnShakes,
  mealContainer,
} from "./constants/elements";
import { breakfasts } from "./constants/breakfastData";
import { lunchs } from "./constants/lunchData";
import { shakes } from "./constants/shakeData";
import { meals } from "./constants/mealData";
import { insertMeals } from "./helpers/insertMeals";

import "./styles.css";

const onInit = () => {
  insertMeals(meals, mealContainer);
};

window.addEventListener("DOMContentLoaded", () => {
  onInit();

  btnAll.addEventListener("click", () => insertMeals(meals, mealContainer));

  btnBreakfast.addEventListener("click", () =>
    insertMeals(breakfasts, mealContainer)
  );

  btnLunch.addEventListener("click", () => insertMeals(lunchs, mealContainer));

  btnShakes.addEventListener("click", () => insertMeals(shakes, mealContainer));
});
