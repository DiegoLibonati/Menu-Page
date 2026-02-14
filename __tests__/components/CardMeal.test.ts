import { screen } from "@testing-library/dom";

import type { CardMealProps } from "@/types/props";
import type { CardMealComponent } from "@/types/components";

import { CardMeal } from "@/components/CardMeal/CardMeal";

const renderComponent = (props: CardMealProps): CardMealComponent => {
  const container = CardMeal(props);
  document.body.appendChild(container);
  return container;
};

describe("CardMeal Component", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  const defaultProps: CardMealProps = {
    amount: "$9.99",
    description: "Delicious breakfast with eggs and bacon",
    imgSrc: "/images/meal.jpg",
    name: "Classic Breakfast",
  };

  it("should render card with correct structure", () => {
    renderComponent(defaultProps);

    const card = document.querySelector<HTMLDivElement>(".card-meal");
    expect(card).toBeInTheDocument();
  });

  it("should render meal name", () => {
    renderComponent(defaultProps);

    expect(screen.getByText("Classic Breakfast")).toBeInTheDocument();
  });

  it("should render meal amount", () => {
    renderComponent(defaultProps);

    expect(screen.getByText("$9.99")).toBeInTheDocument();
  });

  it("should render meal description", () => {
    renderComponent(defaultProps);

    expect(
      screen.getByText("Delicious breakfast with eggs and bacon")
    ).toBeInTheDocument();
  });

  it("should render image with correct attributes", () => {
    renderComponent(defaultProps);

    const image = screen.getByAltText("Classic Breakfast");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "/images/meal.jpg");
  });

  it("should render different meal data", () => {
    const lunchProps: CardMealProps = {
      amount: "$12.99",
      description: "Tasty lunch special",
      imgSrc: "/images/lunch.jpg",
      name: "Lunch Special",
    };

    renderComponent(lunchProps);

    expect(screen.getByText("Lunch Special")).toBeInTheDocument();
    expect(screen.getByText("$12.99")).toBeInTheDocument();
    expect(screen.getByText("Tasty lunch special")).toBeInTheDocument();
  });
});
