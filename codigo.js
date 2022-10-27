const sectionCenter = document.querySelector(".section_container_article");
const btnAll = document.getElementById("all");
const btnBreakfast = document.getElementById("breakfast");
const btnLunch = document.getElementById("lunch");
const btnShakes = document.getElementById("shakes");

class Comida{
    constructor(nombre, precio, descripcion, img){
        this.nombre = nombre;
        this.precio = precio;
        this.descripcion = descripcion;
        this.img = img;
    }

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
}

const breakfastUno = new Comida("American pancakes", "$15", "Easy, American-style, fluffy pancakes are great for feeding a crowd at breakfast or brunch. Top with something sweet like fruit, jam or syrup, or rashers of crispy bacon.", "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/american-style-pancakes-87119e3.jpg?quality=90&webp=true&resize=300,272");
const breakfastDos = new Comida("Aire fryer bacon", "$30", "Cook bacon in an air fryer to achieve a crispy texture with less fat. The perfect bacon sandwich starts here", "https://images.immediate.co.uk/production/volatile/sites/30/2022/04/Air-Fryer-Bacon-cc2a084.jpg?quality=90&webp=true&resize=300,272");
const breakfastTres = new Comida("Prawn & egg on toast", "$30", "Meet your new favourite brunch recipe: quick and easy prawn and egg mayonnaise on toast. Sprinkle with chives to finish", "https://images.immediate.co.uk/production/volatile/sites/30/2022/03/Prawn-and-egg-on-toast-7dda648.jpg?quality=90&webp=true&resize=300,272");
const breakfastCuatro = new Comida("Smoky beans & baked eggs", "$30", "Pack in the nutrients with smoky beans and baked eggs. Great for a veggie family lunch or supper, serve with flatbreads or toast for extra sustenance", "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/smoky-beans-baked-eggs-4a53fb1.jpg?quality=90&webp=true&resize=300,272");

let breakfastDesayunos = [breakfastUno, breakfastDos,breakfastTres,breakfastCuatro];

const lunchUno = new Comida("Big-batch bolognese", "$15", "Whip up a huge batch of bolognese that's fit to feed a hungry crowd, or freeze half for a speedy midweek meal", "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/recipe-image-legacy-id-1074456_10-1a5351d.jpg?quality=90&webp=true&resize=300,272");
const lunchDos = new Comida("Meal prep: pasta", "$15", "Make three lunchbox pasta meals in one go to save you time midweek. They're nutritious and healthy with variations using salmon, chicken and aubergine", "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/mealprep-pasta-merged_web3_copy-8687106.jpg?quality=90&webp=true&resize=300,272");

let lunchDesayunos = [lunchUno, lunchDos];

const shakesUno = new Comida("Breakfast super-shake", "$15", "This smoothie is high in natural fats and sugar - ideal if you need some fuel for intense exercise", "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/breakfast-super-shake-e63774c.jpg?quality=90&webp=true&resize=300,272");
const shakesDos = new Comida("Green spirulina smoothie", "$15", "Start your day with a healthy smoothie. As well as being packed with nutrients, the deep green of spirulina adds rich vibrancy while avocado gives a silky texture", "https://images.immediate.co.uk/production/volatile/sites/30/2022/04/Spirulina-smoothie-40fc97e.jpg?quality=90&webp=true&resize=300,272");

let shakesDesayunos = [shakesUno, shakesDos];

let desayunos = [breakfastUno,breakfastDos,breakfastTres,breakfastCuatro, lunchUno,lunchDos, shakesUno, shakesDos];

window.addEventListener("DOMContentLoaded", ()=>{

let displayMenu = desayunos.map(function(item){
    return item.insertarInfo();
});

    displayMenu = displayMenu.join("");
    sectionCenter.innerHTML = displayMenu;

    btnAll.addEventListener("click", ()=>{
        sectionCenter.innerHTML = displayMenu;
    });

    btnBreakfast.addEventListener("click", ()=>{
        let displayMenuBreakfast = breakfastDesayunos.map(function(bf){

            return bf.insertarInfo();
        });
        displayMenuBreakfast = displayMenuBreakfast.join("");
        sectionCenter.innerHTML = displayMenuBreakfast;
    });

    btnLunch.addEventListener("click", ()=>{
        let displayMenuLunch = lunchDesayunos.map(function(lunch){

            return lunch.insertarInfo();
        });
        displayMenuLunch = displayMenuLunch.join("");
        sectionCenter.innerHTML = displayMenuLunch;
    });

    btnShakes.addEventListener("click", ()=>{
        let displayMenuShakes = shakesDesayunos.map(function(shakes){

            return shakes.insertarInfo();
        });
        displayMenuShakes = displayMenuShakes.join("");
        sectionCenter.innerHTML = displayMenuShakes;
    });
});

