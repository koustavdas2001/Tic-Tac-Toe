let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGamebtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

// First turn for x
let turnX = true;
let moves = 0;

//Storing all the winning patterns 
const winPatterns = [

    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],

];

//Turn Decider
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("button was click");
        if(turnX) {
            box.innerText = "X";
            turnX = false;
            playMusic1();
        }
        else {
            box.innerText = "O";
            turnX = true;
            playMusic2();
        }
        box.disabled = true;
        moves++;
        
        checkWinner();
    });
});


// Applying all the winner patterns
const checkWinner = () => {
    for (let pattern of winPatterns) {
        
      let pos1val = boxes[pattern[0]].innerText;
      let pos2val = boxes[pattern[1]].innerText;
      let pos3val = boxes[pattern[2]].innerText;

      if (pos1val != "" && pos2val != "" && pos3val != "") {
        if (pos1val == pos2val && pos2val == pos3val) {
            console.log("Winner!",pos1val);
            showWinner(pos1val);
            disableBox();
            return;
        }
      }
      //check for draw
      if (moves == boxes.length) {
        showDraw();
      }

    }

};

// Function for disabling the boxes
const disableBox = () => {
    for (box of boxes) {
        box.disabled = true;
    }
};

// Funtion for enabling the boxes
const enableBox = () => {
    for (box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

// Funtion for showing the winner
const showWinner = (winner) => {
    msg.innerText = `Congrats! The Winner is ${winner}`;
    msgContainer.classList.remove("hide");
};
// Function for showing draw
const showDraw = () => {
    msg.innerText = "Looks like its a Draw";
    msgContainer.classList.remove("hide");
}

// Funtion for reseting the game
const resetGame = () => {
    turnX = true;
    moves = 0;
    enableBox();
    msgContainer.classList.add("hide");
}

const playMusic1 = () => {
    let audio = new Audio("audio1.wav");
    audio.play();
}
const playMusic2 = () => {
    let audio = new Audio("audio2.wav");
    audio.play();
}

// Adding reset funtion to the newgame & reset button
newGamebtn.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame);

