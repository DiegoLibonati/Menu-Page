import { IndexStateTest } from "./entities/test";

import { insertMeals } from "./helpers/insertMeals";
import { meals } from "./constants/mealData";
import { breakfasts } from "./constants/breakfastData";
import { lunchs } from "./constants/lunchData";
import { shakes } from "./constants/shakeData";

const INDEX_STATE_TEST: IndexStateTest = {
  testElements: {
    mealContainer: null,
    btnAll: null,
    btnBreakfast: null,
    btnLunch: null,
    btnShakes: null,
  },
};

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
          >
            All
          </button>
          <button
            class="border-[#FADCD9] border-2 border-solid rounded-lg p-2 mx-2 cursor-pointer hover:opacity-75 active:scale-75 transition-all"
            id="breakfast"
          >
            Breakfast
          </button>
          <button
            class="border-[#FADCD9] border-2 border-solid rounded-lg p-2 mx-2 cursor-pointer hover:opacity-75 active:scale-75 transition-all"
            id="lunch"
          >
            Lunch
          </button>
          <button
            class="border-[#FADCD9] border-2 border-solid rounded-lg p-2 mx-2 cursor-pointer hover:opacity-75 active:scale-75 transition-all"
            id="shakes"
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
  document.body.innerHTML = INITIAL_HTML;

  // Elements
  const testElements = INDEX_STATE_TEST.testElements!;

  testElements.mealContainer = document.querySelector(
    ".meals_container"
  ) as HTMLElement;

  testElements.btnAll = document.getElementById("all") as HTMLButtonElement;
  testElements.btnBreakfast = document.getElementById(
    "breakfast"
  ) as HTMLButtonElement;
  testElements.btnLunch = document.getElementById("lunch") as HTMLButtonElement;
  testElements.btnShakes = document.getElementById(
    "shakes"
  ) as HTMLButtonElement;

  const onInit = () => {
    insertMeals(meals, testElements.mealContainer!);
  };

  window.addEventListener("DOMContentLoaded", () => {
    onInit();

    testElements.btnAll?.addEventListener("click", () =>
      insertMeals(meals, testElements.mealContainer!)
    );
    testElements.btnBreakfast?.addEventListener("click", () =>
      insertMeals(breakfasts, testElements.mealContainer!)
    );
    testElements.btnLunch?.addEventListener("click", () =>
      insertMeals(lunchs, testElements.mealContainer!)
    );
    testElements.btnShakes?.addEventListener("click", () =>
      insertMeals(shakes, testElements.mealContainer!)
    );
  });

  window.dispatchEvent(new Event("DOMContentLoaded"));
});

test("It should render all meals after the DOMContentLoaded is run.", () => {
  const mealContainer = INDEX_STATE_TEST.testElements.mealContainer;

  expect(mealContainer).toBeInTheDocument();
  expect(mealContainer?.children).toHaveLength(meals.length);
});

test("It must call the insertElements function when the meals filter buttons are clicked.", () => {
  const mealContainer = INDEX_STATE_TEST.testElements.mealContainer;
  const btnAll = INDEX_STATE_TEST.testElements.btnAll;
  const btnBreakfast = INDEX_STATE_TEST.testElements.btnBreakfast;
  const btnLunch = INDEX_STATE_TEST.testElements.btnLunch;
  const btnShakes = INDEX_STATE_TEST.testElements.btnShakes;

  expect(mealContainer).toBeInTheDocument();
  expect(btnAll).toBeInTheDocument();
  expect(btnBreakfast).toBeInTheDocument();
  expect(btnLunch).toBeInTheDocument();
  expect(btnShakes).toBeInTheDocument();

  btnAll?.click();

  expect(mealContainer?.children).toHaveLength(meals.length);

  btnBreakfast?.click();

  expect(mealContainer?.children).toHaveLength(breakfasts.length);

  btnLunch?.click();

  expect(mealContainer?.children).toHaveLength(lunchs.length);

  btnShakes?.click();

  expect(mealContainer?.children).toHaveLength(shakes.length);
});
