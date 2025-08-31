import { ByRoleMatcher, screen } from "@testing-library/dom";

export const getByClassName = (rol: ByRoleMatcher, className: string) => {
  const elements = screen.getAllByRole(rol) as HTMLElement[];
  const element = elements.find((el) => el.className.includes(className));

  return element ?? null;
};
