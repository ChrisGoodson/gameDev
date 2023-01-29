// initialize variables
let p = false; // flag to check if the game is currently being played
let s; // variable to keep track of the score
let tr; // variable to keep track of the time remaining
let ca; // variable to store the correct answer
let cb; // variable to store the index of the HTML element containing the correct answer
let ic; // variable to store the incorrect answer
let i; // loop variable

// add click event listener to the start game button
document.getElementById("startGame").onclick = function() {
    // if the game is being played, reload the page
    if (p) {
        location.reload();
    } else {
        // set the flag to true to indicate that the game is being played
        p = true;
        // initialize the score to 0
        s = 0;
        // hide the game over message
        invis("gameover");
        // update the current score in the HTML
        document.getElementById("currentScore").innerHTML = s;
        // show the countdown
        viz("cDown");
        // update the text of the start game button
        document.getElementById("startGame").innerHTML = "Reset Game";
        // set the time remaining to 60 seconds
        tr = 60;
        // update the time remaining in the HTML
        document.getElementById("tVal").innerHTML = tr;
        // start the game timer
        gameTimer();
        // generate the first question
        questionGen();
        // loop through the answer boxes
        for (i = 1; i < 5; i++) {
            // add a click event listener to each answer box
            document.getElementById("box" + i).onclick = function() {
                // if the game is being played
                if (p) {
                    // if the clicked answer is correct
                    if (this.innerHTML == ca) {
                        // increment the score and time remaining
                        s++;
                        tr +=.5;
                        // update the current score in the HTML
                        document.getElementById("currentScore").innerHTML = s;
                        // hide the try again message
                        invis("tryAgain");
                        // show the correct answer message
                        viz("isCorrect");
                        // after 1 second, hide the correct answer message
                        setTimeout(function() {
                            invis("isCorrect");
                        }, 1000);
                        // generate a new question
                        questionGen();
                    } else {
                        // decrement the time remaining
                        tr -= 1.5;
                        // hide the correct answer message
                        invis("isCorrect");
                        // show the try again message
                        viz("tryAgain");
                        // after 1 second, hide the try again message
                        setTimeout(function() {
                            invis("tryAgain");
                        }, 1000);
                    }
                }
            };
        }
    }
};


/* 
  gameTimer() function starts a timer for the game by setting a interval function.
  The function decrements the value of tr every second, updating the HTML element
  with id 'tVal' to reflect this change. If the value of tr reaches 0, the game is 
  considered over and the 'gameover' display is set to visible, while other display 
  elements 'cDown', 'isCorrect', and 'tryAgain' are set to invisible. The interval function 
  is then cleared and the value of 'p' is set to false, the innerHTML of the element with 
  id 'startGame' is set to 'Start Game' and the final score is displayed in the element 
  with id 'finalscore'.
*/
function gameTimer() {
    a = setInterval(function() {
        tr--;
        document.getElementById("tVal").innerHTML = tr;
        if (tr == 0) {
            viz("gameover");
            invis("cDown");
            invis("isCorrect");
            invis("tryAgain");
            clearInterval(a);
            p = false;
            document.getElementById("startGame").innerHTML = "Start Game";
            document.getElementById("finalscore").innerHTML = s;
        }
    }, 1000);
}

/*
  invis(id) function takes in the id of an HTML element as its argument and sets the 
  display style of that element to 'none'.
*/
function invis(id) {
    document.getElementById(id).style.display = "none";
}

/*
  viz(id) function takes in the id of an HTML element as its argument and sets the 
  display style of that element to 'block'.
*/
function viz(id) {
    document.getElementById(id).style.display = "block";
}

// generate a random question
function questionGen() {
    // generate a random number between 0 and 1
    let op = Math.round(Math.random());

    // if the number is 0, generate an addition problem
    if (op === 0) {
        // generate two random numbers between 0 and 99
        let x = Math.round(99 * Math.random());
        let y = Math.round(99 * Math.random());
        // calculate the correct answer
        ca = x + y;
        // update the HTML elements with the numbers
        document.getElementById("int1").innerHTML = x;
        document.getElementById("int2").innerHTML = y;
        document.getElementById("opper").innerHTML = "+";
        // generate a random number between 1 and 4
        cb = 1 + Math.round(3 * Math.random());
        // update the corresponding HTML element with the correct answer
        document.getElementById("box" + cb).innerHTML = ca;
        // loop through the other HTML elements
        for (i = 1; i < 5; i++) {
            // if the current HTML element is not the one with the correct answer
            if (i != cb) {
                // generate a random number between 0 and 199
                do {
                    ic = Math.round(199 * Math.random());
                    // update the current HTML element with the incorrect answer
                    document.getElementById("box" + i).innerHTML = ic;
                } while (ca == ic); // ensure that the incorrect answer is not the same as the correct answer
            }
        }
    } else { // if the number is not 0, generate a multiplication problem
        // generate two random numbers between 1 and 9
        let x = 1 + Math.round(9 * Math.random());
        let y = 1 + Math.round(9 * Math.random());
        // calculate the correct answer
        ca = x * y;
        // update the HTML elements with the numbers
        document.getElementById("int1").innerHTML = x;
        document.getElementById("int2").innerHTML = y;
        document.getElementById("opper").innerHTML = "x";
        // generate a random number between 1 and 4
        cb = 1 + Math.round(3 * Math.random());
        // update the corresponding HTML element with the correct answer
        document.getElementById("box" + cb).innerHTML = ca;
        // loop through the other HTML elements
        for (i = 1; i < 5; i++) {
            // if the current HTML element is not the one with the correct answer
            if (i != cb) {
                // generate a random number between 1 and 81
                do {
                    ic = 1 + Math.round(9 * Math.random()) * (1 + Math.round(9 * Math.random()));
                    // update the current HTML element with the incorrect answer
                    document.getElementById("box" + i).innerHTML = ic;
                } while (ca == ic); // ensure that the incorrect answer is not the same as the correct answer
            }
        }
    }
}

