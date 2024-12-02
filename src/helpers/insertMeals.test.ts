import { screen } from "@testing-library/dom";

import fs from "fs";
import path from "path";

import { meals } from "../constants/mealData";
import { insertMeals } from "./insertMeals";

const INITIAL_HTML: string = fs.readFileSync(
  path.resolve(__dirname, "../../index.html"),
  "utf8"
);

beforeEach(() => {
  const body = INITIAL_HTML.match(/<body[^>]*>([\s\S]*?)<\/body>/i)![1];
  document.body.innerHTML = body;
});

afterEach(() => {
  document.body.innerHTML = "";
});

test("It must render inside mealContainer the amount of elements that we pass by parameters to insertMeals.", () => {
  const newMeals = meals.slice(0, 3);

  const articles = screen.getAllByRole("article");
  const mealContainer = articles.find((article) =>
    article.classList.contains("meals_container")
  ) as HTMLElement;

  expect(mealContainer).toBeInTheDocument();
  expect(mealContainer).toHaveClass("meals_container");

  insertMeals(newMeals, mealContainer);

  expect(mealContainer!.children).toHaveLength(newMeals.length);
});
