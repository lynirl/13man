import { User } from "./model/User.js";
import { Quiz } from "./model/Quiz.js";
import { Answer } from "./model/Answer.js";

//pour les couleurs css
const colorMap = {
  rouge: "red",
  bleu: "blue",
  jaune: "yellow",
  vert: "green",
};

const shapeMap = {
  cercle: "circle",
  carre: "square",
  triangle: "triangle"
};

//elements de la vue
const ui = {
  btnStart: document.getElementById("main-button"),
  gameContainer: document.getElementById("game-container"),
  itemsContainer: document.getElementById("items-container"),
  endScreen: document.getElementById("end-screen"),
  finalScore: document.getElementById("final-score"),
  btnRestart: document.getElementById("btn-restart"),
  answerButtons: document.querySelectorAll(".item"),
  wrongSign: document.getElementById("wrong-sign"),
  quizCounter: document.getElementById("quiz-counter")
}

//donnees du formulaire
let participantData = JSON.parse(localStorage.getItem("participantData")) || {};
console.log("participant data:", participantData);

//creation de l'user
let formData = JSON.parse(localStorage.getItem("participantData")) || {};
const user = new User(formData);

//gestion des quiz
let currentQuizNumber = 1;
//pour les resultats des quiz
let allQuizResults = [];

//creation du quiz
let quiz = new Quiz();
user.setQuiz(quiz);
console.log("Quiz questions : ", quiz.questions);

//résultats du quiz actuel
let results = [];

// Chronos
let initiationStart = 0;
let movementStart = 0;
let initiationTime = 0;
let movementTime = 0;
let hasMoved = false;

//Réponses infos
let rightAnswerValue = "";

// Mettre à jour l'affichage du compteur
// function updateQuizCounter() {
//   if (ui.quizCounter) {
//     const quizType = getQuizType(currentQuizNumber);
//     ui.quizCounter.innerHTML = `Quiz ${currentQuizNumber} / ${TOTAL_QUIZZES} (Type ${quizType})`;
//   }
//   // Aussi dans le titre du bouton start
//   ui.btnStart.innerHTML = currentQuizNumber === 1 
//     ? "Démarrer" 
//     : `Continuer (${currentQuizNumber}/${TOTAL_QUIZZES})`;
// }

//afficher une question
function showCurrentQuestion() {
  // Afficher le texte au bout de 300ms
  setTimeout(() => {
      for (let item of quiz.questions.partie1.items) {
        const itemDiv = document.createElement("div");
        itemDiv.className = "item";
        itemDiv.style.color = item.color;
        itemDiv.classList.add(item.shape);
        if (item.isCorrect) {
          itemDiv.classList.add("correct");
        }
        const shapeDiv = document.createElement("div");
        shapeDiv.className = `item-shape ${shapeMap[item.shape]}`;
        shapeDiv.style.backgroundColor = colorMap[item.color];
        itemDiv.appendChild(shapeDiv);
        ui.itemsContainer.appendChild(itemDiv);
      }
    document.body.style.cursor = "default";
  }, 300);
}

//passer au quiz suivant
// function nextQuiz() {
//   //on stocke les résultats du quiz actuel
//   allQuizResults.push({
//     quizNumber: currentQuizNumber,
//     quizTitle: quiz.title,
//     quizType: getQuizType(currentQuizNumber),
//     score: quiz.getScore(),
//     total: quiz.questions.length,
//     trials: results
//   });

//   currentQuizNumber++;

//   if (currentQuizNumber <= TOTAL_QUIZZES) {
//     //et on crée le prochain avec le bon type
//     quiz = new Quiz(getQuizType(currentQuizNumber));
//     user.setQuiz(quiz);
//     results = []; // Reset pour le prochain quiz
//     console.log("Quiz questions : ", quiz.questions);

//     // Vider le texte et afficher le bouton
//     ui.colorText.innerHTML = "";
//     ui.btnStart.style.display = "block";
//     ui.btnStart.innerHTML = `Quiz suivant (${currentQuizNumber}/${TOTAL_QUIZZES})`;
    
//     updateQuizCounter();
//     isMouseLocked = true;
//     isAnswerLocked = true;
//   } else {
//     // Tous les quiz sont terminés
//     endAllQuizzes();
//   }
// }

//finir UN quiz (passer au suivant)
// function endQuiz() {
//   const score = quiz.getScore();
//   const total = quiz.questions.length;

//   console.log(`Quiz ${currentQuizNumber} terminé: ${score}/${total}`);

//   // Passer au quiz suivant au lieu de tout terminer
//   nextQuiz();
// }

//finir TOUS les quiz (à la fin du 6ème)
function endAllQuizzes() {
  // Calculer le score total
  let totalScore = 0;
  let totalQuestions = 0;
  
  allQuizResults.forEach(qr => {
    totalScore += qr.score;
    totalQuestions += qr.total;
  });

  //ça masque les elements du jeu
  ui.gameContainer.style.display = "none";
  ui.colorText.style.display = "none";

  //ecran de fin
  ui.finalScore.innerHTML = `
    <h2>Expérience terminée !</h2>
    <p>Score total : ${totalScore} / ${totalQuestions}</p>
    <p>6 quiz complétés</p>
  `;
  ui.endScreen.style.display = "block";

  isMouseLocked = false;

  //clean le localstorage
  localStorage.removeItem("participantData");

  //envoyer TOUTES les donnees des 6 quiz
  // savedata({
  //   user: {
  //     age: user.age,
  //     genre: user.genre,
  //     lateralite: user.lateralite,
  //     daltonisme: user.daltonisme,
  //   },
  //   totalQuizzes: TOTAL_QUIZZES,
  //   allResults: allQuizResults
  // });
}

//enregistrer la reponse
function submitAnswer(itemClicked) {
  endTimer();
  isTracking = false;

  console.log(coordSamples);
  console.log("Mouvement time :", movementTime);

  const q = quiz.getCurrentQuestion();

  const answers = new Answer({
    question: q,
    itemAnswer: itemClicked,
    initiation: initiationTime,
    movement: movementTime,
    area: 0,
  });

  quiz.addAnswer(answers);

  //stocker dans json a la fin de la question
  results.push({
    answer: itemClicked,
    correct: answers.isCorrect(),
    initiationTime: initiationTime,
    movementTime: movementTime,
    timestamp: Date.now(),
    coordinates: coordSamples,
  });

  //pour debug
  console.log("Bonne réponse ?", answers.isCorrect());

  //passer à la suite (ou non)
  // if (quiz.goNext()) {
  //   ui.btnStart.style.display = "block";
  //   ui.btnStart.innerHTML = "Continuer";
  //   ui.colorText.innerHTML = "";
  // } else {
  //   endQuiz();
  // }
  endAllQuizzes();
}

let isAnswerLocked = true;

//bouton demarrer
// (on initie tout)
ui.btnStart.addEventListener("click", () => {
  showCurrentQuestion();
  ui.btnStart.style.display = "none";
  document.body.style.cursor = "none";
  isMouseLocked = false;
  isAnswerLocked = false;
  initiationStart = performance.now();
  movementStart = 0;
  initiationTime = 0;
  movementTime = 0;
  hasMoved = false;
  coordSamples = [];
  isTracking = true;
});


//bouton de reponse
for (let answerButton of ui.answerButtons) {
  answerButton.addEventListener("click", () => {
    const clicked = answerButton; 
    if (!clicked.classList.contains("correct")) {
      if (isAnswerLocked) return;
      ui.wrongSign.style.display = "block";
      ui.btnStart.style.display = "none";
      setTimeout(() => {
        ui.wrongSign.style.display = "none";
        isAnswerLocked = true;
        submitAnswer(clicked);
      }, 2000);
    } else {
      submitAnswer(clicked);
    }
  });
}

//enregistrer IT
let isMouseLocked = true;

let lastMouseX = 0;
let lastMouseY = 0;

document.addEventListener("mousemove", (event) => {
  if (!hasMoved) {
    trackingMouse();

    lastMouseX = event.clientX;
    lastMouseY = event.clientY;
    hasMoved = true;

    initiationTime = ((performance.now() - initiationStart) / 1000).toFixed(3);
    movementStart = performance.now();

    console.log("Initiation time :", initiationTime);
  }
});

//enregistrer MT
function endTimer() {
  if (movementStart > 0) {
    movementTime = ((performance.now() - movementStart) / 1000).toFixed(3);
  } else {
    movementTime = null;
  }

  console.log("Movement time :", movementTime);
}

//sauvegarder les données
function savedata(data) {
  let xhr = new XMLHttpRequest();
  let url = "../../savedata.php";
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  console.log(">>>>>>>> ENVOI JSON", JSON.stringify(data));
  xhr.send(JSON.stringify(data));
}

//coordonnees des clics
let isTracking = false;
let coordSamples = [];
let isTrackingLoopRunning = false;

function trackingMouse() {
  if (isTrackingLoopRunning) return;
  isTrackingLoopRunning = true;

  const targetDelta = 1000 / 70;
  let last = performance.now();

  function loop() {
    const now = performance.now();
    const delta = now - last;

    if (delta >= targetDelta) {
      last = now - (delta % targetDelta);

      if (isTracking) {
        coordSamples.push({
          t: now,
          x: lastMouseX,
          y: lastMouseY,
        });
      }
    }

    requestAnimationFrame(loop);
  }
  loop();
}

//au demarrage, compteur
// updateQuizCounter();