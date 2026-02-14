import type { Meal } from "@/types/app";

import breakfasts from "@/constants/breakfasts";
import lunchs from "@/constants/lunchs";
import shakes from "@/constants/shakes";

const meals: Meal[] = [...breakfasts, ...lunchs, ...shakes];

export default meals;
