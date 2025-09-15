import { Meal } from "@src/models/Meal";

export class Shake extends Meal {
  constructor(name: string, amount: string, description: string, img: string) {
    super(name, amount, description, img);
  }
}
