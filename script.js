let currentQuestion = 0;
let counterCorrect = 0;
let AUDIO_ACCESS = new Audio("audio/access.mp3");
let AUDIO_FAIL = new Audio("audio/fail.mp3");

function init() {
  showQuestion();
}

function showQuestion() {
  // #####################---displays the question and its possible answers---#####################
  if (gameIsOver()) {
    showEndScreen();
  } else {
    updateToNextQuestion();
    updateProgressBar();
  }
}

function answer(selection) {
  // #####################---checked if the answer was correct---#####################
  let question = questions[currentQuestion];
  let selectQuestionNumber = selection.slice(-1); // get the last character of a String
  let idOfCorrectAnswer = `answer_${question.right_answer}`;

  if (selectQuestionNumber == question.right_answer) {
    // correct Answer
    document.getElementById(selection).parentNode.classList.add("bg-success"); // For "parentNode" this is applied to the parent element
    counterCorrect++;
    AUDIO_ACCESS.play();
  } else {
    //false Answer
    document.getElementById(idOfCorrectAnswer).parentNode.classList.add("bg-success");
    document.getElementById(selection).parentNode.classList.add("bg-danger");
    AUDIO_FAIL.play();
  }
  document.getElementById("next-button").disabled = false;
}

function updateToNextQuestion() {
  // #####################---update next question---#####################
  let question = questions[currentQuestion];
  document.getElementById("current-question").innerHTML = currentQuestion + 1;
  document.getElementById("all-questions").innerHTML = questions.length;
  document.getElementById("questiontext").innerHTML = question.question;
  document.getElementById("answer_1").innerHTML = question.answer_1;
  document.getElementById("answer_2").innerHTML = question.answer_2;
  document.getElementById("answer_3").innerHTML = question.answer_3;
  document.getElementById("answer_4").innerHTML = question.answer_4;
}

function nextQuestion() {
  // #####################---show next question---#####################
  currentQuestion++;
  resetAnswerButton();
  showQuestion();
}

function gameIsOver(){
  return currentQuestion >= questions.length;
}

function resetAnswerButton() {
  // #####################---resets all colored answers---#####################
  document.getElementById("next-button").disabled = true;
  document.getElementById("answer_1").parentNode.classList.remove("bg-success");
  document.getElementById("answer_1").parentNode.classList.remove("bg-danger");
  document.getElementById("answer_2").parentNode.classList.remove("bg-success");
  document.getElementById("answer_2").parentNode.classList.remove("bg-danger");
  document.getElementById("answer_3").parentNode.classList.remove("bg-success");
  document.getElementById("answer_3").parentNode.classList.remove("bg-danger");
  document.getElementById("answer_4").parentNode.classList.remove("bg-success");
  document.getElementById("answer_4").parentNode.classList.remove("bg-danger");
}

function updateProgressBar() {
  let percent = ((currentQuestion+1) / questions.length) * 100;
  let roundPercent = Math.round(percent);
  document.getElementById("progressBar").style = ``;
  document.getElementById("progressBar").style = `width: ${roundPercent}%;`;
  document.getElementById("progressBar").innerHTML = `${roundPercent} %`;
}

function restartGame() {
  currentQuestion = 0;
  counterCorrect = 0;
  document.getElementById("endScreen").style = "display: none;";
  document.getElementById("questionBody").style = "";
  document.getElementById("nextQustionBox").style = "";
  document.getElementById("quizImage").style = "";
  document.getElementById("progress").style = "";
  init();
}

function showEndScreen() {
  document.getElementById("endScreen").style = "";
  document.getElementById("questionBody").style = "display: none;";
  document.getElementById("nextQustionBox").style = "display: none;";
  document.getElementById("quizImage").style = "display: none;";
  document.getElementById("progress").style = "display: none;";
  document.getElementById("correctAnswers").innerHTML = `${counterCorrect}`;
  document.getElementById("answersAllQuestions").innerHTML = `${questions.length}`;
}
