const game = document.getElementById('game');
const cells = game.querySelectorAll('.cell');
const winningCombos = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];
let currentPlayer = 'x';
let gameOver = false;

function checkWin() {
  for (let i = 0; i < winningCombos.length; i++) {
    const combo = winningCombos[i];
    const a = cells[combo[0]].innerHTML;
    const b = cells[combo[1]].innerHTML;
    const c = cells[combo[2]].innerHTML;
    if (a === '' || b === '' || c === '') {
      continue;
    }
    if (a === b && b === c) {
      gameOver = true;
      combo.forEach(index => {
        cells[index].classList.add('winning');
      });
      setTimeout(() => {
        alert(`${currentPlayer.toUpperCase()} ganhou!`);
      }, 50);
    }
  }
}

function handleCellClick(e) {
  const cell = e.target;
  if (gameOver || cell.innerHTML !== '') {
    return;
  }
  cell.innerHTML = currentPlayer;
  cell.classList.add(currentPlayer === 'x' ? 'x' : 'o');
  checkWin();
  currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
}


function handleRestartClick() {
  cells.forEach(cell => {
    cell.innerHTML = '';
    cell.classList.remove('winning');
  });
  currentPlayer = 'x';
  gameOver = false;
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
document.getElementById('restart').addEventListener('click', handleRestartClick);
