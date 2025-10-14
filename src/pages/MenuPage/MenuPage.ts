import { ButtonFilter } from "@src/components/ButtonFilter/ButtonFilter";
import { CardMeal } from "@src/components/CardMeal/CardMeal";

import { mealStore } from "@src/stores/mealStore";

export const MenuPage = (): HTMLElement => {
  const main = document.createElement("main");
  main.className = "w-full h-full min-h-screen bg-primary";

  main.innerHTML = `
    <section class="flex flex-col items-center justify-center w-full h-full">
      <article class="flex flex-col items-center justify-center w-full">
        <div class="flex flex-col items-center justify-center mt-6">
          <h1 class="text-4xl">Our Menu</h1>
          <div class="w-24 h-1 rounded-lg bg-secondary"></div>
        </div>

        <div class="flex flex-row mt-6 filters">
        </div>
      </article>
    </section>

    <section class="flex flex-row flex-wrap items-center justify-center mt-6 meals">
    </section>
  `;

  const filters = main.querySelector<HTMLDivElement>(".filters");

  const filterAll = ButtonFilter({
    id: "all",
    ariaLabel: "all filter meal",
    text: "All",
  });
  const filterBreakfast = ButtonFilter({
    id: "breakfast",
    ariaLabel: "breakfast filter meal",
    text: "Breakfast",
  });
  const filterLunch = ButtonFilter({
    id: "lunch",
    ariaLabel: "lunch filter meal",
    text: "Lunch",
  });
  const filterShake = ButtonFilter({
    id: "shakes",
    ariaLabel: "shakes filter meal",
    text: "Shakes",
  });

  filters?.append(filterAll, filterBreakfast, filterLunch, filterShake);

  const renderMeals = () => {
    const { meals } = mealStore.getState();

    const sectionMeals = main.querySelector<HTMLElement>(".meals");
    sectionMeals?.replaceChildren();

    meals.forEach((meal) => {
      const cardMeal = CardMeal({
        amount: meal.amount,
        description: meal.description,
        imgSrc: meal.imgSrc,
        name: meal.name,
      });

      sectionMeals?.append(cardMeal);
    });
  };

  renderMeals();

  mealStore.subscribe("meals", renderMeals);

  return main;
};
