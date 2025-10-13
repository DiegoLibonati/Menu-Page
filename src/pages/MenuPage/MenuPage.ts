import { ButtonFilter } from "@src/components/ButtonFilter/ButtonFilter";
import { CardMeal } from "@src/components/CardMeal/CardMeal";

import meals from "@src/constants/meals";

export const MenuPage = (): HTMLElement => {
  const main = document.createElement("main");
  main.className = "w-full h-full min-h-screen bg-primary";

  const section = document.createElement("section");
  section.className = "flex flex-col items-center justify-center w-full h-full";

  const articleHeader = document.createElement("article");
  articleHeader.className = "flex flex-col items-center justify-center w-full";

  const divTitle = document.createElement("div");
  divTitle.className = "flex flex-col items-center justify-center mt-6";

  const title = document.createElement("h1");
  title.className = "text-4xl";
  title.textContent = "Our Menu";

  const divLine = document.createElement("div");
  divLine.className = "w-24 h-1 rounded-lg bg-secondary";

  const divFilters = document.createElement("div");
  divFilters.className = "flex flex-row mt-6";

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

  const articleMeals = document.createElement("article");
  articleMeals.className =
    "flex flex-row flex-wrap items-center justify-center mt-6 meals";

  meals.forEach((meal) => {
    const cardMeal = CardMeal({
      amount: meal.amount,
      description: meal.description,
      imgSrc: meal.imgSrc,
      name: meal.name,
    });

    articleMeals.append(cardMeal);
  });

  divTitle.append(title);
  divTitle.append(divLine);

  divFilters.append(filterAll);
  divFilters.append(filterBreakfast);
  divFilters.append(filterLunch);
  divFilters.append(filterShake);

  articleHeader.append(divTitle);
  articleHeader.append(divFilters);

  section.append(articleHeader);
  section.append(articleMeals);

  main.append(section);

  return main;
};
