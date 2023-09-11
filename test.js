let board = {
    1: ' ',
    2: ' ',
    3: ' ',
    4: ' ',
    5: ' ',
    6: ' ',
    7: ' ',
    8: ' ',
    9: ' '
};

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

function markBoard(position, mark) {
    board[position] = mark;
}

function validateMove(position) {
    if (!(position > 0 && position < 10)) {
        return false;
    }
    if (board[position] != ' ') {
        return false;
    }
    return true;
}

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
    [3, 5, 7],
];

function checkWin(player) {
    for (let array of winCombinations) {
        if (board[array[0]] == player && array[1] == player && array[2] == player) {
            return true;
        }
    }
    return false;
}

function checkFull() {
    for (let x in board) {
        if (board[x] == ' '){
            return false;
        } 
    }
    return true;
}