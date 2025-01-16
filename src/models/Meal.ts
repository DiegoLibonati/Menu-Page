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
      "flex flex-col w-full max-w-96 h-96 bg-secondary m-2 rounded-b-lg"
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
    h3.setAttribute("class", "rounded-lg p-1 bg-primary text-sm font-semibold");
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
