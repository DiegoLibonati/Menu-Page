import { Food } from "./Food";

export class Breakfast extends Food {
  constructor(name: string, amount: string, description: string, img: string) {
    super(name, amount, description, img);
  }
}
