import { getByClassName } from "./getByClassName";

const INITIAL_HTML = `
    <main>
        <section>
            <article class="test1" />
            <article class="test2" />
            <article class="test3" />
        </section>
    </main>
`;

const EXISTING_CLASS = "test2";
const NO_EXISTING_CLASS = "test4";

describe("getByClassName.ts", () => {
  describe("General Tests.", () => {
    beforeEach(() => {
      document.body.innerHTML = INITIAL_HTML;
    });

    afterEach(() => {
      document.body.innerHTML = "";
    });

    test("It must return an html element with a specific class and a specific role.", () => {
      const element = getByClassName("article", EXISTING_CLASS);

      expect(element).toBeTruthy();
      expect(element).toBeInTheDocument();
      expect(element).toHaveClass(EXISTING_CLASS);
    });

    test("It Must NOT return an html element, must return null.", () => {
      const element = getByClassName("article", NO_EXISTING_CLASS);

      expect(element).toBe(null);
      expect(element).toBeFalsy();
      expect(element).not.toBeInTheDocument();
    });
  });
});
