//un quiz: c'est un set d'essais

import { Essai } from "./Essai.js";
import { TypeEssai } from "./Essai.js";

export class Quiz {
  constructor() {
    this.questions = this.generateQuestions();
    this.answers = { 
      
    };
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
    let questions = {
      partie1: [],
      partie2: [],
      partie3: [],
      partie4: []
    }
      
    const nbEssais = 20;

    for (let i = 0; i < nbEssais; i++) {
      
      questions.partie1 = this.shuffleArray(new Essai(
        TypeEssai.TRAITSIMPLE,
        9
       )
      )

      questions.partie2 = this.shuffleArray(new Essai(
        TypeEssai.TRAITSIMPLE,
        16
       )
      )

      questions.partie3 = this.shuffleArray(new Essai(
        TypeEssai.CONJONCTION,
        9
       )
      )

      questions.partie4 = this.shuffleArray(new Essai(
        TypeEssai.CONJONCTION,
        16
       )
      )
    }

    return questions;
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
