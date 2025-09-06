let currentPlayer = 'X';

let starter = 'X';

let gameOver = false;

let styleType = 'square';

const moves = { X: [], O: [] };

const board = document.getElementById('board');

const winnerDisplay = document.getElementById('winnerDisplay');

const turnDisplay = document.getElementById('turnDisplay');

const gameScreen = document.getElementById('game-screen');

const choiceScreen = document.getElementById('choice-screen');

function startGame(type) {

  styleType = type;

  choiceScreen.classList.add('hidden');

  gameScreen.classList.remove('hidden');

  board.classList.toggle('circle', type === 'circle');

  resetGame();

}

function goBack() {

  gameScreen.classList.add('hidden');

  choiceScreen.classList.remove('hidden');

}

function createBoard() {

  board.innerHTML = '';

  for (let i = 0; i < 9; i++) {

    const cell = document.createElement('div');

    cell.classList.add('cell');

    cell.dataset.index = i;

    cell.addEventListener('click', () => handleMove(cell));

    board.appendChild(cell);

  }

  updateTurnDisplay();

}

function handleMove(cell) {

  if (gameOver || cell.textContent) return;

  const index = parseInt(cell.dataset.index);

  cell.textContent = currentPlayer;

  moves[currentPlayer].push(index);

  if (moves[currentPlayer].length > 3) {

    const removed = moves[currentPlayer].shift();

    board.children[removed].textContent = '';

  }

  if (checkWin(moves[currentPlayer])) {

    displayWin(currentPlayer);

    return;

  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

  updateTurnDisplay();

}

function updateTurnDisplay() {

  turnDisplay.textContent = `${currentPlayer}'s Turn`;

}

function checkWin(playerMoves) {

  const winPatterns = [

    [0,1,2], [3,4,5], [6,7,8],

    [0,3,6], [1,4,7], [2,5,8],

    [0,4,8], [2,4,6]

  ];

  return winPatterns.some(pattern =>

    pattern.every(pos => playerMoves.includes(pos))

  );

}

function displayWin(winner) {

  gameOver = true;

  winnerDisplay.textContent = `${winner} Wins!`;

  winnerDisplay.style.display = 'block';

  document.body.classList.add('black-bg');

  setTimeout(() => resetGame(true), 3000);

}

function resetGame(auto = false) {

  document.body.classList.remove('black-bg');

  winnerDisplay.style.display = 'none';

  moves.X = [];

  moves.O = [];

  gameOver = false;

  if (auto) {

    starter = starter === 'X' ? 'O' : 'X';

  }

  currentPlayer = starter;

  createBoard();

}