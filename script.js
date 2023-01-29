
// Set up initial values for the game
let timeTaken = 0, score = 0, totalQuestions = 10, currentQuestion, timeRemaining, updateTimeInterval;

// Generate a new question based on the difficulty level selected by the player
generateQuestion = () => {
// Get the difficulty level value from the HTML select element
let difficultyLevel = document.getElementById("difficulty-level").value;

// Set the timeTaken based on the selected difficulty level
if (difficultyLevel === "easy") {
timeTaken = 30;
} else if (difficultyLevel === "medium") {
timeTaken = 60;
} else {
timeTaken = 120;
}

// Create a new question and set the timeRemaining to timeTaken
currentQuestion = createQuestion();
timeRemaining = timeTaken;

// Start the updateTime function every second using setInterval
updateTimeInterval = setInterval(updateTime, 1000);

// Display the current question on the screen
displayQuestion();
};


// createQuestion function is used to generate a math problem
// based on the randomly selected operator (+, -, or *).
createQuestion = () => {
    // An array of possible operators
    let operator = ["+", "-", "*"][Math.floor(Math.random() * 3)];
  
    // Variables to store the first and second numbers of the math problem
    let firstNumber, secondNumber;
  
    // Check the operator and generate random numbers based on it
    if (operator === "+") {
      // For addition, the numbers can be between 0 and 9
      firstNumber = Math.floor(Math.random() * 10);
      secondNumber = Math.floor(Math.random() * 10);
    } else if (operator === "-") {
      // For subtraction, the first number can be between 0 and 99
      // and the second number must be less than the first number
      firstNumber = Math.floor(Math.random() * 100);
      secondNumber = Math.floor(Math.random() * firstNumber);
    } else {
      // For multiplication, the numbers can be between 0 and 10
      firstNumber = Math.floor(Math.random() * 11);
      secondNumber = Math.floor(Math.random() * 11);
    }
  
    // Return the generated math problem
    return { operator, firstNumber, secondNumber };
  };
  
  // displayQuestion function is used to display the current math problem
  // on the HTML page by updating the innerHTML of the math-problem element.
  displayQuestion = () => {
    document.getElementById("math-problem").innerHTML =
      // Concatenate the numbers and the operator to form the math problem
      currentQuestion.firstNumber + currentQuestion.operator + currentQuestion.secondNumber;
  };
  

// Check if the player's answer to the current math problem is correct
checkAnswer = () => {
    // Get the player's answer from the input field
    let playerAnswer = document.getElementById("player-answer").value;
    
    // Calculate the correct answer to the current question
    let correctAnswer = eval(
      currentQuestion.firstNumber + currentQuestion.operator + currentQuestion.secondNumber
    );
    
    // Compare the player's answer with the correct answer
    if (playerAnswer == correctAnswer) {
      // If the answer is correct, increase the score by 1
      score++;
      
      // Increase the time taken by 0.667
      timeTaken += 0.667;
      
      // Update the result display to show that the answer is correct
      document.getElementById("result").innerHTML = "Correct!";
    } else {
      // If the answer is incorrect, decrease the total number of questions by 1
      totalQuestions--;
      
      // Update the result display to show that the answer is incorrect
      document.getElementById("result").innerHTML = "Incorrect.";
    }
    
    // Check if the game is over
    if (totalQuestions <= 0 || timeTaken <= 0) {
      // If the game is over, call the endGame function
      endGame();
    } else {
      // If the game is not over, update the score display
      document.getElementById("score").innerHTML = "Score: " + score;
      
      // Update the total questions display
      document.getElementById("total-questions").innerHTML = "Questions: " + totalQuestions;
      
      // Create a new question for the player
      currentQuestion = createQuestion();
      
      // Display the new question to the player
      displayQuestion();
    }
  };
  

// updateTime function updates the time remaining in the game
// every second by decrementing the value of timeRemaining
updateTime = () => {
    // Decrement the value of timeRemaining by 1
    timeRemaining--;
    
    // Update the HTML element with id "time-remaining" to show the updated time remaining
    document.getElementById("time-remaining").innerHTML = "Time Remaining: " + timeRemaining;
    
    // If the time remaining reaches 0, end the game
    if (timeRemaining <= 0) {
      endGame();
    }
  };
  
  // endGame function stops the time interval, updates the display to show the final score and 
  // questions, and provides a restart button to the player.
  endGame = () => {
    // Stop the time interval set by setInterval function
    clearInterval(updateTimeInterval);
    
    // Update the HTML element with id "math-problem" to show "Game Over!"
    document.getElementById("math-problem").innerHTML = "Game Over!";
    
    // Clear the display of the result
    document.getElementById("result").innerHTML = "";
    
    // Clear the display of the time remaining
    document.getElementById("time-remaining").innerHTML = "";
    
    // Update the HTML element with id "score" to show the final score
    document.getElementById("score").innerHTML = "Final Score: " + score;
    
    // Update the HTML element with id "total-questions" to show the final number of questions
    document.getElementById("total-questions").innerHTML = "Final Questions: " + totalQuestions;
    
    // Add a restart button to the HTML element with id "restart"
    document.getElementById("restart").innerHTML = "<button onclick='location.reload()'>Restart</button>";
  };
