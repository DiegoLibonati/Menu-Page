# Menu-Page

## Getting Started

1. Clone the repository
2. Join to the correct path of the clone
3. Install LiveServer extension from Visual Studio Code [OPTIONAL]
4. Click in "Go Live" from LiveServer extension

---

1. Clone the repository
2. Join to the correct path of the clone
3. Open index.html in your favorite navigator

---

1. Clone the repository
2. Join to the correct path of the clone
3. Execute: `yarn install`
4. Execute: `yarn dev`

## Description

I made a web page that allows you to see a food menu. This menu has different buttons and depending on which button we touch it will bring us that type of food. If we tap on All, it will bring up all the meals again. I made this page with POO.

## Technologies used

1. Typescript
2. TailwindCSS
3. HTML5

## Libraries used

1. postcss
2. autoprefixer
3. @testing-library/dom
4. @testing-library/jest-dom
5. @types/jest
6. jest
7. jest-environment-jsdom
8. ts-jest

## Portfolio Link

[`https://www.diegolibonati.com.ar/#/project/101`](https://www.diegolibonati.com.ar/#/project/101)

## Video

https://github.com/DiegoLibonati/Menu-Page/assets/99032604/78f2dd9c-d02a-41ee-9a31-a496b0ba8de7

## Testing

1. Join to the correct path of the clone
2. Execute: `yarn install`
3. Execute: `yarn test`

## Documentation

In `mealContainer` we get where we are going to render the meals, then we get all the buttons in the other variables which would be `all, breakfast, lunch and shakes`:

```
export const mealContainer = document.querySelector(
  ".meals_container"
) as HTMLElement;
export const btnAll = document.getElementById("all") as HTMLButtonElement;
export const btnBreakfast = document.getElementById(
  "breakfast"
) as HTMLButtonElement;
export const btnLunch = document.getElementById("lunch") as HTMLButtonElement;
export const btnShakes = document.getElementById("shakes") as HTMLButtonElement;
```

The class `Meal` will have as attributes `name, amount, description, img` and a single method called `insertCard()` this method will be in charge of printing the HTML with the information that we pass to it by the attributes:

```
export class Meal {
  constructor(
    public name: string,
    public amount: string,
    public description: string,
    public img: string
  ) {}

  insertCard(): HTMLDivElement {
    const div = document.createElement("div");
    div.setAttribute(
      "class",
      "flex flex-col w-full max-w-96 h-96 bg-[#FADCD9] m-2 rounded-b-lg"
    );

    const img = document.createElement("img");
    img.setAttribute("class", "w-full h-[65%] rounded-t-lg object-cover");
    img.src = this.img;
    img.alt = this.name;

    const div2 = document.createElement("div");
    div2.setAttribute(
      "class",
      "flex flex-col items-start justify-start w-full px-2 h-[35%]"
    );

    const div3 = document.createElement("div");
    div3.setAttribute(
      "class",
      "flex flex-row items-center justify-between w-full mt-2"
    );

    const h2 = document.createElement("h2");
    h2.setAttribute("class", "truncate w-64 text-base font-semibold");
    h2.textContent = this.name;

    const h3 = document.createElement("h3");
    h3.setAttribute(
      "class",
      "rounded-lg p-1 bg-[#F9F1F0] text-sm font-semibold"
    );
    h3.textContent = this.amount;

    div3.append(h2);
    div3.append(h3);

    const p = document.createElement("p");
    p.setAttribute("class", "text-sm mt-2");
    p.textContent = this.description;

    div2.append(div3);
    div2.append(p);

    div.append(img);
    div.append(div2);

    return div;
  }
}
```

In this case we will take as an example `lunchs` this will be our array of this specific category in which we created two types of meal that are lunch, we created 2 objects of the class `Lunch` and they were instantiated:

```
export const lunchs = [
  new Lunch(
    "Big-batch bolognese",
    "$15",
    "Whip up a huge batch of bolognese that's fit to feed a hungry crowd, or freeze half for a speedy midweek meal",
    "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/recipe-image-legacy-id-1074456_10-1a5351d.jpg?quality=90&webp=true&resize=300,272"
  ),
  new Lunch(
    "Meal prep: pasta",
    "$15",
    "Make three lunchbox pasta meals in one go to save you time midweek. They're nutritious and healthy with variations using salmon, chicken and aubergine",
    "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/mealprep-pasta-merged_web3_copy-8687106.jpg?quality=90&webp=true&resize=300,272"
  ),
];
```

In this array we will store all the meals to render all the meals when we touch the `All` button:

```
export const meals: Meals = [...breakfasts, ...lunchs, ...shakes];
```

When the DOM is fully loaded all the meals will be displayed and then each button will be assigned a click event that will allow it to render the meals of its category:

```
const onInit = () => {
  insertMeals(meals, mealContainer);
};

window.addEventListener("DOMContentLoaded", () => {
  onInit();

  btnAll.addEventListener("click", () => insertMeals(meals, mealContainer));

  btnBreakfast.addEventListener("click", () =>
    insertMeals(breakfasts, mealContainer)
  );

  btnLunch.addEventListener("click", () => insertMeals(lunchs, mealContainer));

  btnShakes.addEventListener("click", () => insertMeals(shakes, mealContainer));
});
```
