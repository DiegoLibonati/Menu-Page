import { Lunch } from "@src/models/Lunch";

const LUNCH = {
  name: "Big-batch bolognese",
  amount: "$15",
  description:
    "Whip up a huge batch of bolognese that's fit to feed a hungry crowd, or freeze half for a speedy midweek meal",
  img: "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/recipe-image-legacy-id-1074456_10-1a5351d.jpg?quality=90&webp=true&resize=300,272",
};

describe("Lunch Class", () => {
  let lunch: Lunch = new Lunch(
    LUNCH.name,
    LUNCH.amount,
    LUNCH.description,
    LUNCH.img
  );

  test("It must have the correct initial state when initializing an instance of lunch.", () => {
    expect(lunch.name).toBe(LUNCH.name);
    expect(lunch.amount).toBe(LUNCH.amount);
    expect(lunch.description).toBe(LUNCH.description);
    expect(lunch.img).toBe(LUNCH.img);
  });
});
