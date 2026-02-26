//un item: c'est une forme, possédant une couleur, une forme, et si il est correct ou non
export class Item {
  constructor({ color, shape, isCorrect }) {
    this.color = color;
    this.shape = shape;
    this.isCorrect = isCorrect
  }
}
