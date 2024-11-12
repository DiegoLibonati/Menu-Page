import { Meals } from "../entities/vite-env";

import { breakfasts } from "./breakfastData";
import { lunchs } from "./lunchData";
import { shakes } from "./shakeData";

export const meals: Meals = [...breakfasts, ...lunchs, ...shakes];
