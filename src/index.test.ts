import { screen } from "@testing-library/dom";

import { meals } from "./constants/mealData";
import { breakfasts } from "./constants/breakfastData";
import { lunchs } from "./constants/lunchData";
import { shakes } from "./constants/shakeData";

import { getByClassName } from "./tests/helpers/getByClassName";

const INITIAL_HTML: string = `
  <main class="w-full h-full min-h-screen bg-[#F9F1F0]">
    <section class="flex flex-col items-center justify-center w-full h-full">
      <article class="flex flex-col items-center justify-center w-full">
        <div class="flex flex-col items-center justify-center mt-6">
          <h1 class="text-4xl">Our Menu</h1>
          <div class="w-24 h-1 rounded-lg bg-[#FADCD9]"></div>
        </div>

        <div class="flex flex-row mt-6">
          <button
            class="border-[#FADCD9] border-2 border-solid rounded-lg p-2 mx-2 cursor-pointer hover:opacity-75 active:scale-75 transition-all"
            id="all"
            aria-label="all filter meal"
          >
            All
          </button>
          <button
            class="border-[#FADCD9] border-2 border-solid rounded-lg p-2 mx-2 cursor-pointer hover:opacity-75 active:scale-75 transition-all"
            id="breakfast"
            aria-label="breakfast filter meal"
          >
            Breakfast
          </button>
          <button
            class="border-[#FADCD9] border-2 border-solid rounded-lg p-2 mx-2 cursor-pointer hover:opacity-75 active:scale-75 transition-all"
            id="lunch"
            aria-label="lunch filter meal"
          >
            Lunch
          </button>
          <button
            class="border-[#FADCD9] border-2 border-solid rounded-lg p-2 mx-2 cursor-pointer hover:opacity-75 active:scale-75 transition-all"
            id="shakes"
            aria-label="shakes filter meal"
          >
            Shakes
          </button>
        </div>
      </article>

      <article
        class="flex flex-row flex-wrap items-center justify-center mt-6 meals_container"
      ></article>
    </section>
  </main>
`;

beforeEach(() => {
  jest.resetModules();
  document.body.innerHTML = INITIAL_HTML;
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

test("It must call the insertElements function when the meals filter buttons are clicked.", () => {
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

  btnAll.click();

  expect(mealContainer.children).toHaveLength(meals.length);

  btnBreakfast.click();

  expect(mealContainer.children).toHaveLength(breakfasts.length);

  btnLunch.click();

  expect(mealContainer.children).toHaveLength(lunchs.length);

  btnShakes.click();

  expect(mealContainer.children).toHaveLength(shakes.length);
});
