/// <reference types="vite/client" />

import { Breakfast } from "@src/models/Breakfast";
import { Lunch } from "@src/models/Lunch";
import { Shake } from "@src/models/Shake";

// Types

export type Meals = (Breakfast & Lunch & Shake)[];
