import { Meals } from "@src/entities/vite-env";

import { breakfasts } from "@src/constants/breakfastData";
import { lunchs } from "@src/constants/lunchData";
import { shakes } from "@src/constants/shakeData";

export const meals: Meals = [...breakfasts, ...lunchs, ...shakes];
