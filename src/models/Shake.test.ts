import { Shake } from "./Shake";

const SHAKE = {
  name: "Breakfast super-shake",
  amount: "$15",
  description:
    "This smoothie is high in natural fats and sugar - ideal if you need some fuel for intense exercise",
  img: "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/breakfast-super-shake-e63774c.jpg?quality=90&webp=true&resize=300,272",
};

describe("Shake Class", () => {
  let shake: Shake = new Shake(
    SHAKE.name,
    SHAKE.amount,
    SHAKE.description,
    SHAKE.img
  );

  test("It must have the correct initial state when initializing an instance of shake.", () => {
    expect(shake.name).toBe(SHAKE.name);
    expect(shake.amount).toBe(SHAKE.amount);
    expect(shake.description).toBe(SHAKE.description);
    expect(shake.img).toBe(SHAKE.img);
  });
});
