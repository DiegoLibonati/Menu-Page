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

## Description

I made a web page that allows you to see a food menu. This menu has different buttons and depending on which button we touch it will bring us that type of food. If we tap on All, it will bring up all the meals again. I made this page with POO.

## Technologies used

1. Javascript
2. CSS3
3. HTML5

## Video

https://user-images.githubusercontent.com/99032604/199139166-84b8a1cc-c6ad-424a-90e0-ee2c2bcb3696.mp4

## Documentation

In `sectionCenter` we get where we are going to render the meals, then we get all the buttons in the other variables which would be `all, breakfast, lunch and shakes`:

```
const sectionCenter = document.querySelector(".section_container_article");
const btnAll = document.getElementById("all");
const btnBreakfast = document.getElementById("breakfast");
const btnLunch = document.getElementById("lunch");
const btnShakes = document.getElementById("shakes");
```

The class `Food` will have as attributes `name, amount, description, img` and a single method called `insertInformation()` this method will be in charge of printing the HTML with the information that we pass to it by the attributes:

```
class Food {
  constructor(name, amount, description, img) {
    this.name = name;
    this.amount = amount;
    this.description = description;
    this.img = img;
  }

  insertInformation() {
    return `<div class="section_container_article-item">

        <div class="item-imagen">
            <img src="${this.img}" alt="${this.name}">
        </div>

        <div class="section_container_article-informacion">
            <div class="item-informacion">
            <h3>${this.name}</h3>
            <h3>${this.amount}</h3>
            </div>

            <div class="item-descripcion">
                <p>${this.description}</p>
            </div>
        </div>

    </div>`;
  }
}
```

In this case we will take as an example `lunchs` this will be our array of this specific category in which we created two types of food that are lunch, we created 2 objects of the class `Food` and they were instantiated:

```
const lunchOne = new Food(
  "Big-batch bolognese",
  "$15",
  "Whip up a huge batch of bolognese that's fit to feed a hungry crowd, or freeze half for a speedy midweek meal",
  "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/recipe-image-legacy-id-1074456_10-1a5351d.jpg?quality=90&webp=true&resize=300,272"
);
const lunchTwo = new Food(
  "Meal prep: pasta",
  "$15",
  "Make three lunchbox pasta meals in one go to save you time midweek. They're nutritious and healthy with variations using salmon, chicken and aubergine",
  "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/mealprep-pasta-merged_web3_copy-8687106.jpg?quality=90&webp=true&resize=300,272"
);

const lunchs = [lunchOne, lunchTwo];
```

In this array we will store all the meals to render all the meals when we touch the `All` button:

```
const allFoods = [
  breakfastOne,
  breakfastTwo,
  breakfastTr,
  breakfastFour,
  lunchOne,
  lunchTwo,
  shakesOne,
  shakesTwo,
];
```

When the DOM is fully loaded all the meals will be displayed and then each button will be assigned a click event that will allow it to render the meals of its category:

```
window.addEventListener("DOMContentLoaded", () => {
  let displayMenu = allFoods.map(function (item) {
    return item.insertInformation();
  });

  displayMenu = displayMenu.join("");
  sectionCenter.innerHTML = displayMenu;

  btnAll.addEventListener("click", () => {
    sectionCenter.innerHTML = displayMenu;
  });

  btnBreakfast.addEventListener("click", () => {
    let displayMenuBreakfast = breakfasts.map(function (bf) {
      return bf.insertInformation();
    });
    displayMenuBreakfast = displayMenuBreakfast.join("");
    sectionCenter.innerHTML = displayMenuBreakfast;
  });

  btnLunch.addEventListener("click", () => {
    let displayMenuLunch = lunchs.map(function (lunch) {
      return lunch.insertInformation();
    });
    displayMenuLunch = displayMenuLunch.join("");
    sectionCenter.innerHTML = displayMenuLunch;
  });

  btnShakes.addEventListener("click", () => {
    let displayMenuShakes = shakes.map(function (shakes) {
      return shakes.insertInformation();
    });
    displayMenuShakes = displayMenuShakes.join("");
    sectionCenter.innerHTML = displayMenuShakes;
  });
});
```
