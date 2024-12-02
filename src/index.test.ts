import { screen } from "@testing-library/dom";
import user from "@testing-library/user-event";

import { meals } from "./constants/mealData";
import { breakfasts } from "./constants/breakfastData";
import { lunchs } from "./constants/lunchData";
import { shakes } from "./constants/shakeData";

import { getByClassName } from "./tests/helpers/getByClassName";
import { OFFICIAL_BODY } from "./tests/jest.setup";

beforeEach(() => {
  document.body.innerHTML = OFFICIAL_BODY;

  require("./index.ts");
  document.dispatchEvent(new Event("DOMContentLoaded"));
});

afterEach(() => {
  document.body.innerHTML = "";
});

test("It should render all meals after the DOMContentLoaded is run.", () => {
  const mealContainer = getByClassName("article", "meals_container");

  expect(mealContainer).toBeInTheDocument();
  expect(mealContainer?.children).toHaveLength(meals.length);
});

test("It must call the insertElements function when the meals filter buttons are clicked.", async () => {
  const mealContainer = getByClassName("article", "meals_container")!;

  const btnAll = screen.getByRole("button", {
    name: /all filter meal/i,
  });
  const btnBreakfast = screen.getByRole("button", {
    name: /breakfast filter meal/i,
  });
  const btnLunch = screen.getByRole("button", {
    name: /lunch filter meal/i,
  });
  const btnShakes = screen.getByRole("button", {
    name: /shakes filter meal/i,
  });

  expect(mealContainer).toBeInTheDocument();
  expect(btnAll).toBeInTheDocument();
  expect(btnBreakfast).toBeInTheDocument();
  expect(btnLunch).toBeInTheDocument();
  expect(btnShakes).toBeInTheDocument();

  await user.click(btnAll);

  expect(mealContainer.children).toHaveLength(meals.length);

  await user.click(btnBreakfast);

  expect(mealContainer.children).toHaveLength(breakfasts.length);

  await user.click(btnLunch);

  expect(mealContainer.children).toHaveLength(lunchs.length);

  await user.click(btnShakes);

  expect(mealContainer.children).toHaveLength(shakes.length);
});
