export class Food {
  constructor(
    public name: string,
    public amount: string,
    public description: string,
    public img: string
  ) {}

  insertInformation(): string {
    return `
        <div class="section_container_article-item">         
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
        </div>
      `;
  }
}
