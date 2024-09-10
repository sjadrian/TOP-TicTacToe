
// load script when DOM Content Loaded
document.addEventListener('DOMContentLoaded', () => {

    const game = gameController();

    const instrText = document.getElementById('instructionText');

    const resetButton = document.getElementById('resetButton');
 

    const box0 = document.getElementById('0');
    const box1 = document.getElementById('1');
    const box2 = document.getElementById('2');
    const box3 = document.getElementById('3');
    const box4 = document.getElementById('4');
    const box5 = document.getElementById('5');
    const box6 = document.getElementById('6');
    const box7 = document.getElementById('7');
    const box8 = document.getElementById('8');

    const box0Text = document.getElementById('box0Text');
    const box1Text = document.getElementById('box1Text');
    const box2Text = document.getElementById('box2Text');
    const box3Text = document.getElementById('box3Text');
    const box4Text = document.getElementById('box4Text');
    const box5Text = document.getElementById('box5Text');
    const box6Text = document.getElementById('box6Text');
    const box7Text = document.getElementById('box7Text');
    const box8Text = document.getElementById('box8Text');

    instrText.innerHTML = updateInstruction(game.getActivePlayer());


    function disableButtons() {
        // disable all boxes
        box0.onclick = false;
        box1.onclick = false;
        box2.onclick = false;
        box3.onclick = false;
        box4.onclick = false;
        box5.onclick = false;
        box6.onclick = false;
        box7.onclick = false;
        box8.onclick = false;
    };

    function updateText(element, text) {
        element.innerHTML = text;
    }

    function resetGame() {
        game.resetGame();

        box0Text.innerHTML = "";
        box1Text.innerHTML = "";
        box2Text.innerHTML = "";
        box3Text.innerHTML = "";
        box4Text.innerHTML = "";
        box5Text.innerHTML = "";
        box6Text.innerHTML = "";
        box7Text.innerHTML = "";
        box8Text.innerHTML = "";

        // enable all boxes
        box0.onclick = () => handleBoxClick(box0, box0Text);
        box1.onclick = () => handleBoxClick(box1, box1Text);
        box2.onclick = () => handleBoxClick(box2, box2Text);
        box3.onclick = () => handleBoxClick(box3, box3Text);
        box4.onclick = () => handleBoxClick(box4, box4Text);
        box5.onclick = () => handleBoxClick(box5, box5Text);
        box6.onclick = () => handleBoxClick(box6, box6Text);
        box7.onclick = () => handleBoxClick(box7, box7Text);
        box8.onclick = () => handleBoxClick(box8, box8Text);


        // update first player to X
        updateText(instrText, updateInstruction(game.getActivePlayer()));
    }

    function handleBoxClick(boxNum, boxNumText) {

        let data = boxNum.dataset[0];

        if (game.checkBoardNum(data)) {

            updateText(boxNumText, game.getActivePlayer().getSign());
            game.playRound(data);

            if (game.getWinner()) {
                console.log("winner called");
                updateText(instrText, showWinnerText(game.getActivePlayer()));                
                disableButtons();

            } else if (game.getTie()) {
                console.log("tie called");
                updateText(instrText, showTieText());                
                disableButtons();
            } else {
                updateText(instrText, updateInstruction(game.getActivePlayer()));   
            }
        }
    }

    // initialize onclick
    box0.onclick = () => handleBoxClick(box0, box0Text);
    box1.onclick = () => handleBoxClick(box1, box1Text);
    box2.onclick = () => handleBoxClick(box2, box2Text);
    box3.onclick = () => handleBoxClick(box3, box3Text);
    box4.onclick = () => handleBoxClick(box4, box4Text);
    box5.onclick = () => handleBoxClick(box5, box5Text);
    box6.onclick = () => handleBoxClick(box6, box6Text);
    box7.onclick = () => handleBoxClick(box7, box7Text);
    box8.onclick = () => handleBoxClick(box8, box8Text);

    resetButton.onclick = function() {
        console.log("reset clicked");
        resetGame();
    }
});

function updateInstruction(player) {
    console.log("updateInstruction called")
    // console.log(`${player.getSign()}'s turn`)
    return `Player ${player.getSign()}'s turn`;
}

function showWinnerText(player) {
    // console.log(`${player.getSign()}'s turn`)
    return `Player ${player.getSign()} has won!`;
}

function showTieText() {
    return `It's a Tie!`;
};



function Gameboard() {
    /* initialize board consist of 9 [3x3] empty squares
        [0 1 2]
        [3 4 5]
        [6 7 8]
    */ 
    const board = new Array(9).fill(null);

    // return the current board 
    const getBoard = () => board;

    // get specific board number
    const getBoardField = (num) => board[num];

    // check for available board 
    const availBoard = (num) => {
        if (board[num] !== null) {
            console.log("Field already occupied. Choose another field.");
            return false;
        }
        return true;
    }

    // set specific board number
    const setBoardField = (num, player) => {

        // check the board
        if (availBoard(num)) {
            board[num] = player.getSign();
        }
    }

    // reset the board
    const clearBoard = () => {
        for (let i = 0; i < board.length; i++) {
            board[i] = null;
        }
    }

    // print the current board
    const printBoard = () => {
        console.log('Board:');
        console.log(board[0], board[1], board[2]);
        console.log(board[3], board[4], board[5]);
        console.log(board[6], board[7], board[8]);
    }

    return {
        setBoardField,
        clearBoard,
        printBoard,
        getBoard,
        availBoard,
    };
}

// new player which encapsulate sign
function Player(sign) {
    this.sign = sign;

    const getSign = () => {
        return this.sign;
    };

    return {
        getSign
    };
};

function gameController() {

    // initialize board
    const board = Gameboard();

    // initialize players
    const playerX = new Player("X");
    const playerO = new Player("O");

    // initialize winner and tie to false
    let winner = false;
    let tie = false;

    // let playerX to be the first player
    let firstPlayer = playerX;
    let activePlayer = firstPlayer;

    // switch player turn
    const switchPlayerTurn = () => {
        console.log("Switch turn");
        activePlayer = activePlayer === playerX ? playerO : playerX;
    }

    // return active player
    const getActivePlayer = () => activePlayer;

    // return winner
    const getWinner = () => winner;

    // return tie
    const getTie = () => tie;

    // (debug) print board on console 
    const printNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().getSign()}'s turn`)
    }

    // check for ties
    const checkTies = () => {

        console.log("Check Ties");

        var idxNull = [];
        board.getBoard().forEach((cell, index) => cell !== null ? idxNull.push(index) : null);
        console.log(`Not null'idx: ${idxNull}`)
        
        // if board is full, it's a tie
        if (idxNull.length === 9) {
            console.log("tie");
            tie = true;
            return true;
        }
        return false
    }

    // check for winner
    const checkWinner = () => {

        console.log("Check winner");

        var idxs = [];

        board.getBoard().forEach((cell, index) => cell === getActivePlayer().getSign() ? idxs.push(index) : null);
        console.log(`${getActivePlayer().getSign()}'idx: ${idxs}`)

        const winConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
          ];
        
        // check if combination exists in winCondition
        for (const combination of winConditions) {
            if (combination.every(index => idxs.includes(index))) {
                winner = true;
                console.log(`winner: ` + winner);
            console.log(`winner: ` + getActivePlayer().getSign());
                return true;
            }
          }
        return false;
    }


    // reset for a new game
    const resetGame = () => {

        // reset winner or tie
        winner = false;
        tie = false;

        // reset board
        board.clearBoard();

        // (debug) print new board in console
        board.printBoard();

        // reset first player
        activePlayer = firstPlayer;
    }

    // check specific board
    const checkBoardNum = (num) => {
        return board.availBoard(num);
    }

    // play a round
    const playRound = (num) => {

        // (debug)
        console.log(`${getActivePlayer().getSign()}'s turn into ${num}`)
        
        // set board based off players turn
        board.setBoardField(num, getActivePlayer());

        //check win
        checkWinner();

        //check ties
        checkTies();

        // no winner game continues
        if (!winner && !tie) {
            // switch player
            switchPlayerTurn();

            // (debug) print new board on console
            printNewRound();
        } 
        // winner or tie happens
        else {
            board.printBoard();
            console.log("Game over");
        }
    }
    
    // (debug)
    printNewRound();

    return {
        playRound,
        getActivePlayer,
        checkBoardNum,
        resetGame,
        getWinner,
        getTie
    };
}
