import "@testing-library/jest-dom";
import { screen, within } from "@testing-library/dom";

import { Meal } from "./Meal";

import { meals } from "../constants/mealData";

const MEAL = meals[0];

describe("Food Class", () => {
  let meal: Meal = new Meal(MEAL.name, MEAL.amount, MEAL.description, MEAL.img);

  test("It must have the correct initial state when initializing an instance of meal.", () => {
    expect(meal.name).toBe(MEAL.name);
    expect(meal.amount).toBe(MEAL.amount);
    expect(meal.description).toBe(MEAL.description);
    expect(meal.img).toBe(MEAL.img);
  });

  test("It must execute the insertCard method, add it to the dom and see that the meal is rendered in the body.", () => {
    const card = meal.insertCard();

    document.body.appendChild(card);

    expect(card).toBeInTheDocument();
    expect(card).toHaveClass(
      "flex flex-col w-full max-w-96 h-96 bg-[#FADCD9] m-2 rounded-b-lg"
    );

    const img = within(card).getByRole("img");

    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", meal.img);
    expect(img).toHaveAttribute("alt", meal.name);

    const name = screen.getByRole("heading", {
      name: meal.name,
    });

    expect(name).toBeInTheDocument();

    const amount = screen.getByRole("heading", {
      name: meal.amount,
    });

    expect(amount).toBeInTheDocument();

    const description = screen.getByText(meal.description);

    expect(description).toBeInTheDocument();
  });
});
