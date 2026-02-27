//un essai: c'est l'affichage des formes et leur choix par l'utilisateur. en gros c'est une question

export class Essai {
  constructor({ typeEssai, nbItems }) {
    this.typeEssai = typeEssai;
    this.nbItems = nbItems;
  }

  generateItems() {
    if (this.typeEssai === TypeEssai.TRAITSIMPLE) {
      this.generateTraitSimpleItems();
    } else if (this.typeEssai === TypeEssai.CONJONCTION) {
      this.generateConjonctionItems();
    }
  }

  /**
   * Génère les items pour un essai de type trait simple 
   */
  generateTraitSimpleItems() {
    
    const targetColor = Color[Math.floor(Math.random() * Color.length)];
    const distractorColor = Color.filter(color => color !== targetColor)[Math.floor(Math.random() * (Color.length - 1))];
    const shape = Shape[Math.floor(Math.random() * Shape.length)];

    this.nbItems.push(new Item(shape, targetColor, true));

    for (let i = 1; i < this.nbItems; i++) {
      this.nbItems.push(new Item(shape, distractorColor));
    }
  }

  /**
   * Génère les items pour un essai de type conjonction
   */
  generateConjonctionItems() {
    const targetColor = Color[Math.floor(Math.random() * Color.length)];
    const targetShape = Shape[Math.floor(Math.random() * Shape.length)];
    const distractorColors = Color.filter(color => color !== targetColor);
    const distractorShapes = Shape.filter(shape => shape !== targetShape);
    this.nbItems.push(new Item(targetShape, targetColor, true));

    for (let i = 1; i < this.nbItems; i++) {
      const color = distractorColors[Math.floor(Math.random() * distractorColors.length)];
      const shape = distractorShapes[Math.floor(Math.random() * distractorShapes.length)];
      this.nbItems.push(new Item(shape, color));
    }
  }
}


export const TypeEssai = {
  TRAITSIMPLE: "TRAITSIMPLE",
  CONJONCTION: "CONJONCTION", 
}

export const Color = [
  "red",
  "green",
  "blue",
  "yellow"
]

export const Shape = [
  "square",
  "circle",
  "triangle"
]