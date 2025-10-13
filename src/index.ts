import { MenuPage } from "@src/pages/MenuPage/MenuPage";

const onInit = () => {
  const app = document.querySelector<HTMLDivElement>("#app")!;
  const page = MenuPage();
  app.appendChild(page);
};

document.addEventListener("DOMContentLoaded", onInit);
