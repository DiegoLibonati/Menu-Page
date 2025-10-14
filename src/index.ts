import { MenuPage } from "@src/pages/MenuPage/MenuPage";

const onInit = () => {
  const app = document.querySelector<HTMLDivElement>("#app")!;
  const menuPage = MenuPage();
  app.appendChild(menuPage);
};

document.addEventListener("DOMContentLoaded", onInit);
