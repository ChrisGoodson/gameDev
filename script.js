// Declare variables to store the time taken, score and the total number of questions
let timeTaken = 0;
let score = 0;
let totalQuestions = 10;

// Declare a variable to store the current question object
let currentQuestion;

// Declare the `generateQuestion` function to randomly generate a math question
let generateQuestion = () => {
  // Get the selected difficulty level from the dropdown
  let difficultyLevel = document.getElementById("difficulty-level").value;

  // Set the time limit based on the selected difficulty level
  if (difficultyLevel === "easy") {
    timeTaken = 30;
  } else if (difficultyLevel === "medium") {
    timeTaken = 60;
  } else {
    timeTaken = 120;
  }

  // Call the `createQuestion` function to generate a new question
  currentQuestion = createQuestion();

  // Start the timer and display the question
  setInterval(displayQuestion, 1000);
};

// Declare the `createQuestion` function to generate a math question
function createQuestion() {
  // Generate a random operator (+, -, *)
  let operator = ["+", "-", "*"][Math.floor(Math.random() * 3)];

  let firstNumber, secondNumber;

  // Generate two random numbers based on the selected operator
  if (operator === "+") {
    firstNumber = Math.floor(Math.random() * 10);
    secondNumber = Math.floor(Math.random() * 10);
  } else if (operator === "-") {
    firstNumber = Math.floor(Math.random() * 100);
    secondNumber = Math.floor(Math.random() * firstNumber);
  } else {
    firstNumber = Math.floor(Math.random() * 11);
    secondNumber = Math.floor(Math.random() * 11);
  }

  // Return the generated question as an object
  return { operator: operator, firstNumber: firstNumber, secondNumber: secondNumber };
}

// Declare the `displayProblem` function to display the math problem
let displayProblem = (question) => {
    document.getElementById("math-problem").innerHTML = question.firstNumber + question.operator + question.secondNumber;
  };
  
  // Declare the `checkAnswer` function to check the player's answer
  let checkAnswer = () => {
    // Get the player's answer
    let playerAnswer = document.getElementById("player-answer").value;
  
    // Evaluate the correct answer for the current question
    let correctAnswer = eval(currentQuestion.firstNumber + currentQuestion.operator + currentQuestion.secondNumber);
  
    // Check if the player's answer is correct
    if (playerAnswer === correctAnswer) {
      score++;
      timeTaken += 0.667;
      document.getElementById("result").innerHTML = "Correct!";
    } else {
      totalQuestions--;
      document.getElementById("result").innerHTML = "Incorrect.";
    }
  
    // Check if the game should end
    if (totalQuestions <= 0 || timeTaken <= 0) {
      endGame();
    } else {
      document.getElementById("score").innerHTML = "Score: " + score;
      document.getElementById("total-questions").innerHTML = "Questions: " + totalQuestions;
      currentQuestion = createQuestion();
    }
  
    // Display the new question
    displayProblem(currentQuestion);
  };
  
  // Declare the `updateTime` function to update the time remaining
let updateTime = () => {
    timeRemaining--;
    document.getElementById("time-remaining").innerHTML = "Time Remaining: " + timeRemaining;
  };
  
  // Declare the `endGame` function to end the game
  let endGame = () => {
    clearInterval(updateInterval);
    document.getElementById("math-problem").innerHTML = "Game Over!";
    document.getElementById("result").innerHTML = "";
    document.getElementById("time-remaining").innerHTML = "";
    document.getElementById("score").innerHTML = "Final Score: " + score;
    document.getElementById("total-questions").innerHTML = "Final Questions: " + totalQuestions;
    document.getElementById("restart").innerHTML = "<button onclick='location.reload()'>Restart</button>";
  };
  