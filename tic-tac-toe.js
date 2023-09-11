/*  A simple Tic-Tac-Toe game
Players 'X' and 'O' take turn inputing their position on the command line using numbers 1-9
1 | 2 | 3
---------
4 | 5 | 6
---------
7 | 8 | 9
*/

// importing user import library
// missed ({sigint: true});
const prompt = require('prompt-sync')({sigint: true});

let board = {
    1: ' ', 2: ' ', 3: ' ',
    4: ' ', 5: ' ', 6: ' ',
    7: ' ', 8: ' ', 9: ' '
};

// TODO: update the gameboard with the user input
function markBoard(position, mark) {
    board[position] = mark;
}

// TODO: print the game board as described at the top of this code skeleton
function printBoard() {
    for (let x in board) {
        if (board[x] != ' ') {
            if (x == 3 || x == 6 || x == 9) {
                process.stdout.write(`${board[x]}`);
                console.log('');
                console.log("---------");
            }
            else {
                process.stdout.write(`${board[x]} | `);
            }
        }
        else {
            if (x == 3 || x == 6 || x == 9) {
                process.stdout.write(`${x}`);;
                console.log('');
                console.log("---------");
            }
            else {
                process.stdout.write(`${x} | `);;
            }
        }
    }
}


// TODO: check for wrong input, this function should return true or false.
// true denoting that the user input is correct
// you will need to check for wrong input (user is entering invalid position) or position is out of bound
// another case is that the position is already occupied
function validateMove(position) {
    if (!(position > 0 && position < 10)) {
        return false;
    }
    if (board[position] != ' ') {
        return false;
    }
    return true;
}

// TODO: list out all the combinations of winning, you will neeed this
// one of the winning combinations is already done for you
let winCombinations = [
     // rows
     [1, 2, 3],
     [4, 5, 6],
     [7, 8, 9],
     // columns
     [1, 4, 7],
     [2, 5, 8],
     [3, 6, 9],
     // crosses
     [1, 5, 9],
     [3, 5, 7]
];

// TODO: implement a logic to check if the previous winner just win
// This method should return with true or false
function checkWin(player) {
    for (let array of winCombinations) {
        if (board[array[0]] == player && board[array[1]] == player && board[array[2]] == player) {
            return true;
        }
    }
    return false;
}

// TODO: implement a function to check if the game board is already full
// For tic-tac-toe, tie bascially means the whole board is already occupied
// This function should return with boolean
function checkFull() {
    for (let x in board) {
        if (board[x] == ' '){
            return false;
        } 
    }
    return true;
}

// *****************************************************
// Copy all your code/fucntions in Part 1 to above lines
// (Without Test Cases)
// *****************************************************


// TODO: the main part of the program
// This part should handle prompting the users to put in their next step, checking for winning or tie, etc
function playTurn(player) {
    let position = prompt(`${player}'s turn, input: `);
    while (validateMove(position) === false) {
        position = prompt("Invalid input. Input must be a number between 1 to 9: ");
    }
    markBoard(position, player);
    printBoard();
    if (checkWin(player) === true) {
        console.log(`Congratulations ${player}! You won the game!`);
        winnerIdentified = true;
    }
    if (checkFull() === true) {
        console.log(`Game is a tie!`);
        winnerIdentified = true;
    }
    if (player == 'X') {
        currentTurnPlayer = 'Y';
    }
    else {
        currentTurnPlayer = 'X';
    }
}

// entry point of the whole program
console.log('Game started: \n\n' +
    ' 1 | 2 | 3 \n' +
    ' --------- \n' +
    ' 4 | 5 | 6 \n' +
    ' --------- \n' +
    ' 7 | 8 | 9 \n');

let winnerIdentified = false;
let currentTurnPlayer = 'X';

while (!winnerIdentified){
    playTurn(currentTurnPlayer);
    // feel free to add logic here if needed, e.g. announcing winner or tie
}


// Bonus Point: Implement the feature for the user to restart the game after a tie or game over
function restartGame() {
    while (!winnerIdentified){
        playTurn(currentTurnPlayer);
    }
}
let quit = false;
while(winnerIdentified && !quit) {
    let newGame = prompt("Start a new game (y/n)? ");
    while (newGame.toUpperCase() != 'Y' && newGame.toUpperCase() != 'N') {
        newGame = prompt("Press 'y' to start a new game or 'n' to quit the programme: ");
    }
    if (newGame.toUpperCase() == 'Y') {
        for (let x in board) {
            board[x] = ' ';
        }
        winnerIdentified = false;
        printBoard();
        restartGame();
    }
    else {
        quit = true;
    }
}
