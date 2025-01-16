import { screen } from "@testing-library/dom";

import { insertMeals } from "./insertMeals";
import { meals } from "../constants/mealData";

import { OFFICIAL_BODY } from "../tests/jest.constants";

describe("insertMeals.ts", () => {
  describe("General Tests.", () => {
    beforeEach(() => {
      document.body.innerHTML = OFFICIAL_BODY;
    });

    afterEach(() => {
      document.body.innerHTML = "";
    });

    test("It must render inside mealContainer the amount of elements that we pass by parameters to insertMeals.", () => {
      const newMeals = meals.slice(0, 3);

      const articles = screen.getAllByRole("article");
      const mealContainer = articles.find((article) =>
        article.classList.contains("meals")
      ) as HTMLElement;

      expect(mealContainer).toBeInTheDocument();
      expect(mealContainer).toHaveClass("meals");

      insertMeals(newMeals, mealContainer);

      expect(mealContainer!.children).toHaveLength(newMeals.length);
    });
  });
});
