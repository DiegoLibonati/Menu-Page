import { ButtonFilterProps } from "@src/entities/props";
import { FilterId } from "@src/entities/app";

import { mealStore } from "@src/stores/mealStore";

const onClick = (id: FilterId) => {
  mealStore.setCurrentFilter(id);
};

export const ButtonFilter = ({
  id,
  ariaLabel,
  text,
}: ButtonFilterProps): HTMLButtonElement => {
  const button = document.createElement("button");
  button.className =
    "border-secondary border-2 border-solid rounded-lg p-2 mx-2 cursor-pointer hover:opacity-75 active:scale-75 transition-all";
  button.id = id;
  button.setAttribute("aria-label", ariaLabel);
  button.textContent = text;

  button.addEventListener("click", () => onClick(id));

  return button;
};
