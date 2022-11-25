const gameButton = document.querySelector(".gameButton");
const game = document.querySelector(".game");
const gameRes = document.querySelector(".result");
const startGameMessage = document.querySelector(".startGame");
const buttonDiv = document.querySelector(".buttonDiv");
let isGameStarted = false;
const allResults = 6;
let playerResults = 0;
gameButton.addEventListener("click", startAndGuess);
let isGameEnded = false;

function startAndGuess() {
  if (isGameStarted === false) {
    isGameStarted = true;
    gameButton.innerHTML = "Check";
    makeGame();
  } else {
    const numbers = document.querySelectorAll(".numb");
    for (let i = 0; i < numbers.length; i++) {
      console.log(numbers[i].correct);
      if (numbers[i].value == numbers[i].correct) {
        numbers[i].style.background = "Green";
        if (numbers[i].disabled !== true) {
          playerResults++;
        }
        numbers[i].disabled = true;
      } else {
        if (numbers[i].value > numbers[i].correct) {
          numbers[i].style.background = "Blue";
        } else if (numbers[i].value < numbers[i].correct) {
          numbers[i].style.background = "Red";
        }
      }
      if (playerResults < 3) {
        gameRes.classList.remove("alert-warning");
        gameRes.classList.remove("alert-success");
        gameRes.classList.add("alert-danger");
      } else if (playerResults < 6) {
        gameRes.classList.remove("alert-danger");
        gameRes.classList.remove("alert-success");
        gameRes.classList.add("alert-warning");
      }
      gameRes.innerHTML =
        "You guessed " + playerResults + " of " + allResults + " right!";
    }
    if (playerResults === allResults) {
      gameRes.classList.remove("alert-warning");
      gameRes.classList.remove("alert-danger");
      gameRes.classList.add("alert-success");
      gameRes.innerHTML =
        "You guessed " +
        playerResults +
        " of " +
        allResults +
        " right!" +
        "</br>" +
        "Congratulations you won!";
        isGameEnded = true;
      restartMaker();
    }
  }
}

function makeGame() {
  for (let i = 0; i < 6; i++) {
    let gameEl = document.createElement("input");
    gameEl.setAttribute("type", "number");
    gameEl.max = 9;
    gameEl.min = 0;
    gameEl.size = 1;
    gameEl.style.width = "50px";
    gameEl.classList.add("numb");
    gameEl.correct = Math.floor(Math.random() * 10);
    gameEl.value = 0;
    gameEl.order = 1;
    game.appendChild(gameEl);
  }
  startGameMessage.classList.add("alert-info");
  startGameMessage.style.marginTop = "20px";
  startGameMessage.innerHTML =
    "Blue inputs means the number you've entered is higher than right answer" +
    "</br>" +
    "Red inputs means the number you've entered is lower than right answer";
}

function restartMaker() {
   if (isGameEnded === true){
    isGameStarted = false;
    gameButton.remove();
    const restartButton = document.createElement("button");
    restartButton.classList.add("btn");
    restartButton.classList.add("btn-warning");
    restartButton.innerHTML = "Restart";
    buttonDiv.appendChild(restartButton);

    restartButton.addEventListener("click", restartGame);
   } else {
    location.reload();
   }
}


function restartGame(){
  location.reload();
}
