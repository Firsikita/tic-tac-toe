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

// Инициализация
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

function checkWinner() {
    for (let row = 0; row < size; row++) {
        if (
            field[row][0] !== EMPTY &&
            field[row].every((cell) => cell === field[row][0])
        ) {
            highlightCells(row, 0, row, size - 1); 
            return field[row][0];
        }
    }

    for (let col = 0; col < size; col++) {
        let columnValues = [];
        for (let row = 0; row < size; row++) {
            columnValues.push(field[row][col]);
        }

        if (
            columnValues[0] !== EMPTY &&
            columnValues.every((val) => val === columnValues[0])
        ) {
            // Победный столбец
            highlightCells(0, col, size - 1, col);
            return columnValues[0];
        }
    }

    let mainDiag = [];
    for (let i = 0; i < size; i++) {
        mainDiag.push(field[i][i]);
    }
    if (
        mainDiag[0] !== EMPTY &&
        mainDiag.every((val) => val === mainDiag[0])
    ) {
        highlightDiagonal(true);
        return mainDiag[0];
    }

    let sideDiag = [];
    for (let i = 0; i < size; i++) {
        sideDiag.push(field[i][size - 1 - i]);
    }
    if (
        sideDiag[0] !== EMPTY &&
        sideDiag.every((val) => val === sideDiag[0])
    ) {
        highlightDiagonal(false);
        return sideDiag[0];
    }

    return null;
}

function highlightCells(rowStart, colStart, rowEnd, colEnd) {
    if (rowStart === rowEnd) {
        for (let col = colStart; col <= colEnd; col++) {
            renderSymbolInCell(field[rowStart][col], rowStart, col, 'red');
        }
    } else if (colStart === colEnd) {
        for (let row = rowStart; row <= rowEnd; row++) {
            renderSymbolInCell(field[row][colStart], row, colStart, 'red');
        }
    }
}

function highlightDiagonal(main) {
    if (main) {
        for (let i = 0; i < size; i++) {
            renderSymbolInCell(field[i][i], i, i, 'red');
        }
    } else {
        for (let i = 0; i < size; i++) {
            renderSymbolInCell(field[i][size - 1 - i], i, size - 1 - i, 'red');
        }
    }
}

function endGame(winner) {
    alert(`Победил ${winner}!`);
    isGameOver = true;
}

function renderGrid(dimension) {
    container.innerHTML = '';

    for (let i = 0; i < dimension; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < dimension; j++) {
            const cell = document.createElement('td');
            cell.textContent = EMPTY;
            cell.addEventListener('click', () => cellClickHandler(i, j));
            row.appendChild(cell);
        }
        container.appendChild(row);
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
