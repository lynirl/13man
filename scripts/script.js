import { User } from "./model/User.js";
import { Quiz } from "./model/Quiz.js";
import { Answer } from "./model/Answer.js";

//elements de la vue
const ui = {
  btnStart: document.getElementById("main-button"),
  gameContainer: document.getElementById("game-container"),
  itemsContainer: document.getElementById("items-container"),
  endScreen: document.getElementById("end-screen"),
  finalScore: document.getElementById("final-score"),
  btnRestart: document.getElementById("btn-restart"),
  wrongSign: document.getElementById("wrong-sign"),
  quizCounter: document.getElementById("quiz-counter")
}

//donnees du formulaire
let formData = JSON.parse(localStorage.getItem("participantData")) || {};
console.log("participant data:", formData);

//creation de l'user
const user = new User(formData);

//gestion des quiz
let allQuizResults = [];

//creation du quiz
let quiz = new Quiz();
user.setQuiz(quiz);
updateCounter();
console.log("Quiz questions : ", quiz.questions);

//résultats du quiz actuel
let results = [];

// Chronos
let initiationStart = 0;
let movementStart = 0;
let initiationTime = 0;
let movementTime = 0;
let hasMoved = false;

//afficher la question courante
function showCurrentQuestion() {
  ui.itemsContainer.innerHTML = "";

  const currentEssai = quiz.questions[quiz.currentIndex];
  const nbItems = currentEssai.items.length;

  //grille dynamique selon le nombre d'items
  const cols = Math.ceil(Math.sqrt(nbItems));
  ui.itemsContainer.style.gridTemplateColumns = `repeat(${cols}, 80px)`;
  ui.itemsContainer.style.gridTemplateRows = `repeat(${cols}, 80px)`;

  setTimeout(() => {
    for (let item of currentEssai.items) {
      const itemDiv = document.createElement("div");
      itemDiv.className = "item";
      itemDiv.classList.add(item.shape);
      if (item.isCorrect) itemDiv.classList.add("correct");

      const shapeDiv = document.createElement("div");
      shapeDiv.className = `item-shape`;

      //couleur selon la forme
      if (item.shape === "triangle") {
        shapeDiv.style.borderBottomColor = item.color;
      } else {
        shapeDiv.style.backgroundColor = item.color;
      }

      itemDiv.appendChild(shapeDiv);
      ui.itemsContainer.appendChild(itemDiv);
    }
    document.body.style.cursor = "default";
  }, 300);
}

//finir TOUS les quiz
function endAllQuizzes() {
  let totalScore = 0;
  let totalQuestions = quiz.questions.length;
  

  ui.gameContainer.style.display = "none";

  ui.finalScore.innerHTML = `
    <h2>Expérience terminée !</h2>
    <p>Score total : ${quiz.getScore()} / ${totalQuestions}</p>
  `;
  ui.endScreen.style.display = "block";

  isMouseLocked = false;

  localStorage.removeItem("participantData");

  //remplir allQuizResults
  allQuizResults.push({
    quizIndex: quiz.currentIndex,
    trials: results
  });


  //envoyer TOUTES les donnees des 6 quiz
  savedata({
    user: {
       age: user.age,
       genre: user.genre,
       lateralite: user.lateralite,
       daltonisme: user.daltonisme,
       troubles: user.troubles,
     },
     allResults: results
   })
}

//enregistrer la reponse
function submitAnswer(itemClicked) {
  endTimer();
  isTracking = false;
  isAnswerLocked = true;

  console.log(coordSamples);
  console.log("Mouvement time :", movementTime);

  const q = quiz.questions[quiz.currentIndex];

  const answer = new Answer(q, itemClicked, initiationTime, movementTime, 0, coordSamples);
  quiz.answers.push(answer);

  results.push({
  //infos sur l'essai
  partType: q.typeEssai,
  nbItems: q.nbItems,
  targetColor: q.items.find(i => i.isCorrect).color,
  targetShape: q.items.find(i => i.isCorrect).shape,
  //résultat
  correct: itemClicked.classList.contains("correct"),
  //temps
  initiationTime: initiationTime,
  movementTime: movementTime,
  timestamp: Date.now(),  
  //trajectoire
  coordinates: coordSamples,
});

  console.log("Bonne réponse ?", itemClicked.classList.contains("correct"));

  if (quiz.goNext()) {
    // question suivante
    ui.btnStart.style.display = "block";
    ui.btnStart.innerHTML = "Continuer";
    updateCounter();
  } else {
    endAllQuizzes();
  }
}

let isAnswerLocked = true;

//bouton demarrer / continuer
ui.btnStart.addEventListener("click", () => {
  showCurrentQuestion();
   updateCounter();
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

//listener sur le container (délégation) car les items sont créés dynamiquement
ui.itemsContainer.addEventListener("click", (event) => {
  const clicked = event.target.closest(".item");
  if (!clicked || isAnswerLocked) return;

  if (!clicked.classList.contains("correct")) {
    ui.wrongSign.style.display = "block";
    setTimeout(() => {
      ui.wrongSign.style.display = "none";
      submitAnswer(clicked);
    }, 2000);
  } else {
    submitAnswer(clicked);
  }
});

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

//coordonnees de la souris
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

//mettre à jour le compteur
function updateCounter() {
  const currentQuestion = quiz.currentIndex + 1;
  const totalQuestions = quiz.questions.length;
  const nbEssaisParPartie = totalQuestions / 4;  // 4 parties

  const currentPart = Math.ceil(currentQuestion / nbEssaisParPartie);

  ui.quizCounter.innerHTML = `Partie ${currentPart}/4 — Question ${currentQuestion}/${totalQuestions}`;
}