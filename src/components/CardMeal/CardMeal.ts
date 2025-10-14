import { CardMealProps } from "@src/entities/props";

export const CardMeal = ({
  amount,
  description,
  imgSrc,
  name,
}: CardMealProps): HTMLDivElement => {
  const divRoot = document.createElement("div");
  divRoot.className =
    "card-meal flex flex-col w-full max-w-96 h-96 bg-secondary m-2 rounded-b-lg";

  divRoot.innerHTML = `
    <img src="${imgSrc}" alt="${name}" class="w-full h-[65%] rounded-t-lg object-cover"></img>

    <div class="flex flex-col items-start justify-start w-full px-2 h-[35%]">
      <div class="flex flex-row items-center justify-between w-full mt-2">
        <h2 class="truncate w-64 text-base font-semibold">${name}</h2>
        <h3 class="rounded-lg p-1 bg-primary text-sm font-semibold">${amount}</h3>
      </div>

      <p class="text-sm mt-2">${description}</p>
    </div>
  `;

  return divRoot;
};
