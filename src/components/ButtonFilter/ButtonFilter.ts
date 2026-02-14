import type { ButtonFilterProps } from "@/types/props";
import type { FilterId } from "@/types/app";
import type { ButtonFilterComponent } from "@/types/components";

import { mealStore } from "@/stores/mealStore";

const onClick = (id: FilterId): void => {
  mealStore.setCurrentFilter(id);
};

export const ButtonFilter = ({
  id,
  ariaLabel,
  text,
}: ButtonFilterProps): ButtonFilterComponent => {
  const button = document.createElement("button") as ButtonFilterComponent;
  button.className =
    "border-secondary border-2 border-solid rounded-lg p-2 mx-2 cursor-pointer hover:opacity-75 active:scale-75 transition-all";
  button.id = id;
  button.setAttribute("aria-label", ariaLabel);
  button.textContent = text;

  const handleClick = (): void => {
    onClick(id);
  };

  button.addEventListener("click", handleClick);

  button.cleanup = (): void => {
    button.removeEventListener("click", handleClick);
  };

  return button;
};
