import { Essai } from "./Essai.js";

export class Quiz {
  constructor(type) {
    this.quizType = type;
    this.questions = this.generateQuestions(type);
    this.answers = [];
    this.currentIndex = 0;
  }

  generateQuestions(type) {
    let questions = [];

    //TO DO : implem avec questions Treisman 

    if (type === 1) {
      questions.push(...Type1Quiz);
    } else {
      questions.push(...Type2Quiz);
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
