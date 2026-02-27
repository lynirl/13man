//un quiz: c'est un set d'essais

import { Essai } from "./Essai.js";
import { TypeEssai } from "./Essai.js";

export class Quiz {
  constructor() {
    this.questions = this.generateQuestions();
    this.answers = [];
    this.currentIndex = 0;
  }

  /**
   * Génère les questions en fonctions des 4 cas : 
   * - traits simples avec 9 items
   * - traits simples avec 16 items
   * - conjonction avec 9 items
   * - conjonction avec 16 items
   */
  generateQuestions() {
    let questions = [];
    const nbEssais = 20;

    for (let i = 0; i < nbEssais; i++) {
      questions.push(new Essai({
        typeEssai: TypeEssai.TRAITSIMPLE,
        nbItems: 9
       })
      )

      questions.push(new Essai({
        typeEssai: TypeEssai.TRAITSIMPLE,
        nbItems: 16
       })
      )

      questions.push(new Essai({
        typeEssai: TypeEssai.CONJONCTION,
        nbItems: 9
       })
      )

      questions.push(new Essai({
        typeEssai: TypeEssai.CONJONCTION,
        nbItems: 16
       })
      )
    }

    questions = this.shuffleArray(questions);
    return questions.map((q) => new Essai(q));
  }

  shuffleArray(questions) {
    for (let i = questions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [questions[i], questions[j]] = [questions[j], questions[i]];
    }
    return questions;
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
    return this.answers.filter((answer) => answer.isCorrect()).length;
  }

  getQuizType(){
    return this.quizType;
  }
}
