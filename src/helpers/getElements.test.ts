import { getElements } from "./getElements";

import fs from "fs";
import path from "path";

const INITIAL_HTML: string = fs.readFileSync(
  path.resolve(__dirname, "../../index.html"),
  "utf8"
);

beforeEach(() => {
  const body = INITIAL_HTML.match(/<body[^>]*>([\s\S]*?)<\/body>/i)![1];
  document.body.innerHTML = body;
});

afterEach(() => {
  document.body.innerHTML = "";
});

test("It must render the elements of the document that the 'getElements' function exports.", () => {
  const { btnAll, btnBreakfast, btnLunch, btnShakes, mealContainer } =
    getElements();

  expect(btnAll).toBeInTheDocument();
  expect(btnBreakfast).toBeInTheDocument();
  expect(btnLunch).toBeInTheDocument();
  expect(btnShakes).toBeInTheDocument();
  expect(mealContainer).toBeInTheDocument();
});
