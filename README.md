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

## Feel free to edit my code

If you want to add more attributes to the foods.

```
constructor(nombre, precio, descripcion, img){
    this.nombre = nombre;
    this.precio = precio;
    this.descripcion = descripcion;
    this.img = img;
}
```

Html food.

```
insertarInfo(){
    return `<article class="section_container_article-item">

    <div class="item-imagen">
    <img src="${this.img}" alt="${this.nombre}">
    </div>

    <div class="section_container_article-informacion">
        <div class="item-informacion">
        <h3>${this.nombre}</h3>
        <h3>${this.precio}</h3>
        </div>

        <div class="item-descripcion">
            <p>${this.descripcion}</p>
        </div>
    </div>

</article>`
}
```

If you want to create a food

```
const breakfastCuatro = new Comida("Smoky beans & baked eggs", "$30", "Pack in the nutrients with smoky beans and baked eggs. Great for a veggie family lunch or supper, serve with flatbreads or toast for extra sustenance", "YOUR IMAGE LINK");
```

Before you create a new food, you must add that food to the respective list

```
let breakfastDesayunos = [breakfastUno, breakfastDos,breakfastTres,breakfastCuatro];
```

## Technologies used

1. Javascript
2. CSS3
3. HTML5

## Galery

![Menu-page](https://raw.githubusercontent.com/DiegoLibonati/DiegoLibonatiWeb/main/data/projects/Javascript/Imagenes/menu-0.jpg)

![Menu-page](https://raw.githubusercontent.com/DiegoLibonati/DiegoLibonatiWeb/main/data/projects/Javascript/Imagenes/menu-1.jpg)

![Menu-page](https://raw.githubusercontent.com/DiegoLibonati/DiegoLibonatiWeb/main/data/projects/Javascript/Imagenes/menu-2.jpg)

![Menu-page](https://raw.githubusercontent.com/DiegoLibonati/DiegoLibonatiWeb/main/data/projects/Javascript/Imagenes/menu-3.jpg)

## Portfolio Link

`https://diegolibonati.github.io/DiegoLibonatiWeb/#/projects?q=Menu%20page`

## Video


https://user-images.githubusercontent.com/99032604/199139166-84b8a1cc-c6ad-424a-90e0-ee2c2bcb3696.mp4

