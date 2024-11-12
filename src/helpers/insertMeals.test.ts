import { screen } from "@testing-library/dom";

import { meals } from "../constants/mealData";
import { insertMeals } from "./insertMeals";

const INITIAL_HTML = `
  <main>
    <section>
      <article class="meal_container">
      </article>
    </section>
  </main>
`;

beforeEach(() => {
  document.body.innerHTML = INITIAL_HTML;
});

test("It must render inside mealContainer the amount of elements that we pass by parameters to insertMeals.", () => {
  const newMeals = meals.slice(0, 3);

  const mealContainer = screen.getByRole("article");

  expect(mealContainer).toBeInTheDocument();
  expect(mealContainer).toHaveClass("meal_container");

  insertMeals(newMeals, mealContainer);

  expect(mealContainer!.children).toHaveLength(newMeals.length);
});
