import type { FilterId } from "@/types/app";

export interface CardMealProps {
  name: string;
  amount: string;
  description: string;
  imgSrc: string;
}

export interface ButtonFilterProps {
  id: FilterId;
  ariaLabel: string;
  text: string;
}
