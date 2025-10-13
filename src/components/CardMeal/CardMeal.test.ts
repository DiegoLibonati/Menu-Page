import { screen, within } from "@testing-library/dom";

import { CardMealProps } from "@src/entities/props";
import { CardMeal } from "@src/components/CardMeal/CardMeal";

type RenderComponent = {
  props: CardMealProps;
  container: HTMLDivElement;
};

const renderComponent = (
  amount: string,
  description: string,
  imgSrc: string,
  name: string
): RenderComponent => {
  const props: CardMealProps = {
    amount,
    description,
    imgSrc,
    name,
  };

  const container = CardMeal({
    amount: props.amount,
    description: props.description,
    imgSrc: props.imgSrc,
    name: props.name,
  });

  document.body.appendChild(container);

  return {
    props: props,
    container: container,
  };
};

describe("CardMeal", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  describe("General Tests.", () => {
    const describeProps = {
      amount: "$9.99",
      description: "Delicious breakfast with eggs and bacon",
      imgSrc: "/images/breakfast.jpg",
      name: "Classic Breakfast",
    };

    test("It should create a div element with correct classes", () => {
      const { container } = renderComponent(
        describeProps.amount,
        describeProps.description,
        describeProps.imgSrc,
        describeProps.name
      );

      expect(container).toBeInstanceOf(HTMLDivElement);
      expect(container.className).toContain("card-meal");
      expect(container.className).toContain("flex");
      expect(container.className).toContain("flex-col");
      expect(container.className).toContain("bg-secondary");
    });

    test("It should render an image with correct attributes", () => {
      const { container, props } = renderComponent(
        describeProps.amount,
        describeProps.description,
        describeProps.imgSrc,
        describeProps.name
      );

      const img = screen.getByRole("img", { name: props.name });

      expect(img).toBeInTheDocument();
      expect(img).toBeInstanceOf(HTMLImageElement);
      expect(img.getAttribute("src")).toContain(props.imgSrc);
      expect(img.getAttribute("alt")).toBe(props.name);
      expect(img.className).toContain("w-full");
      expect(img.className).toContain("rounded-t-lg");
    });

    test("It should render the meal name in an h2 element", () => {
      const { props } = renderComponent(
        describeProps.amount,
        describeProps.description,
        describeProps.imgSrc,
        describeProps.name
      );

      const heading = screen.getByRole("heading", { name: props.name, level: 2 });

      expect(heading).toBeInTheDocument();
      expect(heading).toBeInstanceOf(HTMLHeadingElement);
      expect(heading.textContent).toBe(props.name);
      expect(heading.className).toContain("truncate");
      expect(heading.className).toContain("font-semibold");
    });

    test("It should render the amount in an h3 element", () => {
      const { container, props } = renderComponent(
        describeProps.amount,
        describeProps.description,
        describeProps.imgSrc,
        describeProps.name
      );

      const h3 = screen.getByRole("heading", { name: props.amount, level: 3 });

      expect(h3).toBeInTheDocument();
      expect(h3).toBeInstanceOf(HTMLHeadingElement);
      expect(h3.textContent).toBe(props.amount);
      expect(h3.className).toContain("bg-primary");
      expect(h3.className).toContain("rounded-lg");
    });

    test("It should render the description in a p element", () => {
      const { container, props } = renderComponent(
        describeProps.amount,
        describeProps.description,
        describeProps.imgSrc,
        describeProps.name
      );

      const description = screen.getByText(props.description);

      expect(description).toBeInTheDocument();
      expect(description.tagName).toBe("P");
      expect(description.className).toContain("text-sm");
      expect(description.className).toContain("mt-2");
    });

    test("It should have card-meal class for easy identification", () => {
      const { container } = renderComponent(
        describeProps.amount,
        describeProps.description,
        describeProps.imgSrc,
        describeProps.name
      );

      const cardMeal = document.querySelector(".card-meal");

      expect(cardMeal).toBeInTheDocument();
      expect(cardMeal).toBe(container);
    });
  });

  describe("Structure Tests.", () => {
    test("It should have the correct DOM structure", () => {
      const { container } = renderComponent(
        "$12.50",
        "A tasty meal",
        "/img.jpg",
        "Test Meal"
      );

      const img = container.querySelector("img");
      expect(img).toBeTruthy();

      const contentDiv = container.querySelector(
        "div.flex.flex-col.items-start"
      );
      expect(contentDiv).toBeTruthy();

      const headerDiv = contentDiv?.querySelector(
        "div.flex.flex-row.items-center"
      );
      expect(headerDiv).toBeTruthy();

      const h2 = headerDiv?.querySelector("h2");
      const h3 = headerDiv?.querySelector("h3");
      expect(h2).toBeTruthy();
      expect(h3).toBeTruthy();

      const p = contentDiv?.querySelector("p");
      expect(p).toBeTruthy();
    });

    test("It should have image at the top of the card", () => {
      const { container } = renderComponent(
        "$12.50",
        "A tasty meal",
        "/img.jpg",
        "Test Meal"
      );

      const firstChild = container.firstElementChild;
      expect(firstChild?.tagName).toBe("IMG");
    });

    test("It should have content div as second child", () => {
      const { container } = renderComponent(
        "$12.50",
        "A tasty meal",
        "/img.jpg",
        "Test Meal"
      );

      const secondChild = container.children[1];
      expect(secondChild?.tagName).toBe("DIV");
      expect(secondChild?.className).toContain("items-start");
    });

    test("It should nest h2 and h3 in the same header div", () => {
      const { container } = renderComponent(
        "$12.50",
        "A tasty meal",
        "/img.jpg",
        "Test Meal"
      );

      const headerDiv = container.querySelector("div.flex.flex-row");
      const h2 = headerDiv?.querySelector("h2");
      const h3 = headerDiv?.querySelector("h3");

      expect(h2?.parentElement).toBe(headerDiv);
      expect(h3?.parentElement).toBe(headerDiv);
    });
  });

  describe("Props Variations.", () => {
    test("It should handle empty strings gracefully", () => {
      const { container } = renderComponent("", "", "", "");

      expect(container).toBeInstanceOf(HTMLDivElement);
      expect(container.querySelector("h2")?.textContent).toBe("");
      expect(container.querySelector("h3")?.textContent).toBe("");
      expect(container.querySelector("p")?.textContent).toBe("");
    });

    test("It should handle long text content", () => {
      const longName = "A".repeat(100);
      const longDescription = "B".repeat(200);

      const { container } = renderComponent(
        "$15.99",
        longDescription,
        "/img.jpg",
        longName
      );

      const h2 = screen.getByRole("heading", { level: 2 });
      const description = screen.getByText(longDescription);

      expect(h2.textContent).toBe(longName);
      expect(description.textContent).toBe(longDescription);
      expect(h2.className).toContain("truncate");
    });

    test("It should handle special characters in props", () => {
      const specialName = "Café & Croissant <3";
      const specialDescription = "A meal with 'special' ingredients & love";
      const specialAmount = "$10.50 €";

      const { container } = renderComponent(
        specialAmount,
        specialDescription,
        "/special-img.jpg",
        specialName
      );

      const h2 = screen.getByRole("heading", { name: specialName, level: 2 });
      const h3 = screen.getByRole("heading", { name: specialAmount, level: 3 });
      const description = screen.getByText(specialDescription);

      expect(h2.textContent).toBe(specialName);
      expect(h3.textContent).toBe(specialAmount);
      expect(description.textContent).toBe(specialDescription);
    });

    test("It should handle different image formats", () => {
      const imagePaths = [
        "/images/meal.jpg",
        "/images/meal.png",
        "/images/meal.webp",
        "https://example.com/meal.jpg",
      ];

      imagePaths.forEach((imgPath) => {
        document.body.innerHTML = "";

        const { container } = renderComponent(
          "$10.00",
          "Test description",
          imgPath,
          `Test Meal ${imgPath}`
        );

        const img = container.querySelector("img");
        expect(img?.src).toContain(imgPath);
      });
    });
  });

  describe("Accessibility Tests.", () => {
    test("It should have accessible image with alt text", () => {
      const { props } = renderComponent(
        "$9.99",
        "Delicious meal",
        "/img.jpg",
        "Accessible Meal"
      );

      const img = screen.getByRole("img", { name: props.name });
      expect(img).toBeInTheDocument();
    });

    test("It should have proper heading hierarchy", () => {
      renderComponent(
        "$9.99",
        "Delicious meal",
        "/img.jpg",
        "Meal Name"
      );

      const h2 = screen.getByRole("heading", { level: 2 });
      const h3 = screen.getByRole("heading", { level: 3 });

      expect(h2).toBeInTheDocument();
      expect(h3).toBeInTheDocument();
    });

    test("It should be queryable using within for isolated testing", () => {
      const { container } = renderComponent(
        "$9.99",
        "Delicious meal",
        "/img.jpg",
        "Test Meal"
      );

      const { getByRole, getByText } = within(container);

      expect(getByRole("heading", { level: 2 })).toBeInTheDocument();
      expect(getByRole("heading", { level: 3 })).toBeInTheDocument();
      expect(getByText("Delicious meal")).toBeInTheDocument();
      expect(getByRole("img")).toBeInTheDocument();
    });
  });

  describe("Styling Tests.", () => {
    test("It should have correct dimension classes", () => {
      const { container } = renderComponent(
        "$9.99",
        "Test",
        "/img.jpg",
        "Test"
      );

      expect(container.className).toContain("w-full");
      expect(container.className).toContain("max-w-96");
      expect(container.className).toContain("h-96");
    });

    test("It should have correct border radius classes", () => {
      const { container } = renderComponent(
        "$9.99",
        "Test",
        "/img.jpg",
        "Test"
      );

      expect(container.className).toContain("rounded-b-lg");

      const img = container.querySelector("img");
      expect(img?.className).toContain("rounded-t-lg");
    });

    test("It should apply correct image height", () => {
      const { container } = renderComponent(
        "$9.99",
        "Test",
        "/img.jpg",
        "Test"
      );

      const img = container.querySelector("img");
      expect(img?.className).toContain("h-[65%]");
    });

    test("It should apply correct spacing classes", () => {
      const { container } = renderComponent(
        "$9.99",
        "Test",
        "/img.jpg",
        "Test"
      );

      expect(container.className).toContain("m-2");

      const contentDiv = container.querySelector("div.flex.flex-col.items-start");
      expect(contentDiv?.className).toContain("px-2");
    });
  });
});