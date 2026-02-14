import "@/index.css";
import { MenuPage } from "@/pages/MenuPage/MenuPage";

const onInit = (): void => {
  const app = document.querySelector<HTMLDivElement>("#app");

  if (!app) throw new Error(`You must render a container to mount the app.`);

  const menuPage = MenuPage();
  app.appendChild(menuPage);
};

document.addEventListener("DOMContentLoaded", onInit);
