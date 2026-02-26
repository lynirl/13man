export class User {
  constructor({nom, age, genre, lateralite, daltonisme }) {
    this.nom = nom || null;
    this.age = age || null;
    this.genre = genre || null;
    this.lateralite = lateralite || null;
    this.daltonisme = daltonisme || null;

    this.quiz = null;
  }

  setQuiz(quiz) {
    this.quiz = quiz;
  }
}
