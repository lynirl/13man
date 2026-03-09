// un quiz : c'est un set d'essais

import { Trial } from "./Trial.js";
import { TRIALS } from "./DataTrials.js";

export class Quiz {

  constructor() {

    // on crée les essais à partir des stimuli fixes
    this.questions = this.generateQuestions();

    this.answers = [];
    this.currentIndex = 0;
  }


  /**
   * Génère les essais à partir des TRIALS définis en dur
   * puis mélange leur ordre
   */
  generateQuestions() {

    // transforme chaque trial en objet Essai
    const essais = TRIALS.map(trial => new Trial(trial));

    // mélange l'ordre des essais
    return this.shuffleArray(essais);
  }

  shuffleArray(array) {

    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
  }


  addQuestion(question) {
    this.questions.push(question);
  }


  addAnswer(answer) {
    this.answers.push(answer);
  }


  getCurrentQuestion() {
    return this.questions[this.currentIndex];
  }


  goNext() {

    this.currentIndex++;

    return this.currentIndex < this.questions.length;
  }


  getScore() {

    return this.answers.filter(answer => answer.isCorrect()).length;
  }

}