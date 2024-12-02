import { getElements } from "./getElements";

const INITIAL_HTML: string = `
    <main>
        <article class="meals_container"></article>
        <button
            id="all"
            aria-label="all filter meal"
        >
            All
        </button>
        <button
            id="breakfast"
            aria-label="breakfast filter meal"
        >
            Breakfast
        </button>
        <button
            id="lunch"
            aria-label="lunch filter meal"
        >
            Lunch
        </button>
        <button
            id="shakes"
            aria-label="shakes filter meal"
        >
            Shakes
        </button>
    </main>
`;

beforeEach(() => {
  const body = INITIAL_HTML;

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
