import { Food } from "./Food";

export class Shake extends Food {
  constructor(name: string, amount: string, description: string, img: string) {
    super(name, amount, description, img);
  }
}
