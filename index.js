const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

let size = 3;
let field;
let movesCount = 0;
let isGameOver = false;
const container = document.getElementById('fieldWrapper');

startGame();
addResetListener();

function startGame() {
    isGameOver = false;
    movesCount = 0;
    field = Array.from({ length: size }, () => Array(size).fill(EMPTY));
    renderGrid(size);
}

function cellClickHandler(row, col) {
    if (isGameOver) return;
    if (field[row][col] !== EMPTY) return;

    field[row][col] = CROSS;
    renderSymbolInCell(CROSS, row, col);
    movesCount++;

    const winnerX = checkWinner();
    if (winnerX) {
        endGame(winnerX);
        return;
    }

    if (movesCount === size * size) {
        alert('Победила дружба!');
        isGameOver = true;
        return;
    }

    aiMove();
}

function aiMove() {
    if (isGameOver) return;

    const emptyCells = [];
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (field[i][j] === EMPTY) {
                emptyCells.push({ row: i, col: j });
            }
        }
    }

    if (emptyCells.length === 0) return;

    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const { row, col } = emptyCells[randomIndex];
    field[row][col] = ZERO;
    renderSymbolInCell(ZERO, row, col);
    movesCount++;

    const winnerO = checkWinner();
    if (winnerO) {
        endGame(winnerO);
        return;
    }

    if (movesCount === size * size) {
        alert('Победила дружба!');
        isGameOver = true;
    }
}



function renderSymbolInCell(symbol, row, col, color = '#333') {
    const targetCell = findCell(row, col);
    targetCell.textContent = symbol;
    targetCell.style.color = color;
}

function findCell(row, col) {
    const targetRow = container.querySelectorAll('tr')[row];
    return targetRow.querySelectorAll('td')[col];
}

function addResetListener() {
    const resetButton = document.getElementById('reset');
    resetButton.addEventListener('click', resetClickHandler);
}

function resetClickHandler() {
    startGame();
}

function testWin() {
    clickOnCell(0, 2); 
    clickOnCell(0, 0); 
    clickOnCell(2, 0);
    clickOnCell(1, 1); 
    clickOnCell(2, 2);
    clickOnCell(1, 2); 
    clickOnCell(2, 1); 
}

function testDraw() {
    clickOnCell(2, 0);
    clickOnCell(1, 0);
    clickOnCell(1, 1);
    clickOnCell(0, 0);
    clickOnCell(1, 2);
    clickOnCell(1, 2);
    clickOnCell(0, 2);
    clickOnCell(0, 1);
    clickOnCell(2, 1);
    clickOnCell(2, 2);
}

function clickOnCell(row, col) {
    findCell(row, col).click();
}