import { OFFICIAL_BODY } from "@tests/jest.constants";

import { getElements } from "@src/helpers/getElements";

describe("getElements.ts", () => {
  describe("General Tests.", () => {
    beforeEach(() => {
      document.body.innerHTML = OFFICIAL_BODY;
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
  });
});
