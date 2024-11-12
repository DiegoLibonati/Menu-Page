/// <reference types="vite/client" />

import { Breakfast } from "../models/Breakfast";
import { Lunch } from "../models/Lunch";
import { Shake } from "../models/Shake";

// Types

export type Meals = (Breakfast & Lunch & Shake)[];
