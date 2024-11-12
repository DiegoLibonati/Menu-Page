import { Meal } from "./Meal";

export class Lunch extends Meal {
  constructor(name: string, amount: string, description: string, img: string) {
    super(name, amount, description, img);
  }
}
