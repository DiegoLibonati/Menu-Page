import { Meal } from "@src/entities/app";

import breakfasts from "@src/constants/breakfasts";
import lunchs from "@src/constants/lunchs";
import shakes from "@src/constants/shakes";

const meals: Meal[] = [...breakfasts, ...lunchs, ...shakes];

export default meals;
