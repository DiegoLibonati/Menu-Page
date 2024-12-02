export const getElements = () => ({
  mealContainer: document.querySelector(".meals_container") as HTMLElement,
  btnAll: document.getElementById("all") as HTMLButtonElement,
  btnBreakfast: document.getElementById("breakfast") as HTMLButtonElement,
  btnLunch: document.getElementById("lunch") as HTMLButtonElement,
  btnShakes: document.getElementById("shakes") as HTMLButtonElement,
});
