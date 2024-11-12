import { Breakfast } from "./Breakfast";

const BREAKFAST = {
  name: "American pancakes",
  amount: "$15",
  description:
    "Easy, American-style, fluffy pancakes are great for feeding a crowd at breakfast or brunch. Top with something sweet like fruit, jam or syrup, or rashers of crispy bacon.",
  img: "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/american-style-pancakes-87119e3.jpg?quality=90&webp=true&resize=300,272",
};

describe("Breakfast Class", () => {
  let breakfast: Breakfast = new Breakfast(
    BREAKFAST.name,
    BREAKFAST.amount,
    BREAKFAST.description,
    BREAKFAST.img
  );

  test("It must have the correct initial state when initializing an instance of breakfast.", () => {
    expect(breakfast.name).toBe(BREAKFAST.name);
    expect(breakfast.amount).toBe(BREAKFAST.amount);
    expect(breakfast.description).toBe(BREAKFAST.description);
    expect(breakfast.img).toBe(BREAKFAST.img);
  });
});
