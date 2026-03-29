import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import type { ButtonFilterProps } from "@/types/props";
import type { ButtonFilterComponent } from "@/types/components";

import ButtonFilter from "@/components/ButtonFilter/ButtonFilter";

import { mealStore } from "@/stores/mealStore";

const renderComponent = (props: ButtonFilterProps): ButtonFilterComponent => {
  const container = ButtonFilter(props);
  document.body.appendChild(container);
  return container;
};

describe("ButtonFilter Component", () => {
  beforeEach(() => {
    mealStore.setCurrentFilter("all");
  });

  afterEach(() => {
    document.body.innerHTML = "";
    mealStore.setCurrentFilter("all");
  });

  const defaultProps: ButtonFilterProps = {
    id: "breakfast",
    ariaLabel: "Show breakfast meals",
    text: "Breakfast",
  };

  it("should render button with correct attributes", () => {
    renderComponent(defaultProps);

    const button = screen.getByRole("button", {
      name: "Show breakfast meals",
    });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("id", "breakfast");
    expect(button.textContent).toBe("Breakfast");
  });

  it("should update store filter when clicked", async () => {
    const user = userEvent.setup();
    renderComponent(defaultProps);

    const button = screen.getByRole("button", {
      name: "Show breakfast meals",
    });
    await user.click(button);

    expect(mealStore.get("currentFilter")).toBe("breakfast");
  });

  it("should render different filter buttons", () => {
    const lunchProps: ButtonFilterProps = {
      id: "lunch",
      ariaLabel: "Show lunch meals",
      text: "Lunch",
    };

    renderComponent(lunchProps);

    const button = screen.getByRole("button", { name: "Show lunch meals" });
    expect(button).toBeInTheDocument();
    expect(button.textContent).toBe("Lunch");
  });

  it("should cleanup event listener", async () => {
    const user = userEvent.setup();
    const button = renderComponent(defaultProps);

    button.cleanup?.();

    const buttonElement = screen.getByRole("button", {
      name: "Show breakfast meals",
    });
    await user.click(buttonElement);

    expect(mealStore.get("currentFilter")).toBe("all");
  });
});
