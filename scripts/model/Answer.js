export class Answer {
  constructor(question, itemAnswer, initiation, movement, area, coordSamples) {
    this.question = question;
    this.itemAnswer = itemAnswer;
    this.initiationTime = initiation;
    this.movementTime = movement;
    this.area = area;
    this.coordinates = coordSamples;
  }

  isCorrect() {
    return this.question.isCorrect(this.itemAnswer);
  }
}