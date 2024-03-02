window.onload = main;

const M = 8;
const VISITED_BOX_NUM = -1;
const matrix = [];
let currentPosition;

function main() {
  createMatrix();
  initMatrix();
  putHorse();

  while (!isFinished()) {
    initMatrix();
    moveHorse();
  }

  console.log(matrix);
}

function createMatrix() {
  for (let i = 0; i < M; i++) {
    matrix[i] = [];
    for (let j = 0; j < M; j++) {
      matrix[i][j] = 0;
    }
  }
}

function initMatrix() {
  for (let i = 0; i < M; i++) {
    for (let j = 0; j < M; j++) {
      if (matrix[i][j] !== VISITED_BOX_NUM) {
        matrix[i][j] = getAvailableMovesCount(i, j);
      }
    }
  }
}

function putHorse() {
  matrix[0][0] = VISITED_BOX_NUM;
  currentPosition = [0, 0];
}

function isFinished() {
  for (let i = 0; i < M; i++) {
    for (let j = 0; j < M; j++) {
      if (matrix[i][j] !== VISITED_BOX_NUM) {
        return false;
      }
    }
  }

  return true;
}

function getAvailableMoves(i, j) {
  const availableMoves = [];

  if (i - 2 >= 0 && j - 1 >= 0 && matrix[i - 2][j - 1] !== VISITED_BOX_NUM) {
    availableMoves.push([i - 2, j - 1]);
  }
  if (i - 2 >= 0 && j + 1 < M && matrix[i - 2][j + 1] !== VISITED_BOX_NUM) {
    availableMoves.push([i - 2, j + 1]);
  }
  if (i - 1 >= 0 && j + 2 < M && matrix[i - 1][j + 2] !== VISITED_BOX_NUM) {
    availableMoves.push([i - 1, j + 2]);
  }
  if (i - 1 >= 0 && j - 2 >= 0 && matrix[i - 1][j - 2] !== VISITED_BOX_NUM) {
    availableMoves.push([i - 1, j - 2]);
  }
  if (i + 2 < M && j + 1 < M && matrix[i + 2][j + 1] !== VISITED_BOX_NUM) {
    availableMoves.push([i + 2, j + 1]);
  }
  if (i + 2 < M && j - 1 >= 0 && matrix[i + 2][j - 1] !== VISITED_BOX_NUM) {
    availableMoves.push([i + 2, j - 1]);
  }
  if (i + 1 < M && j - 2 >= 0 && matrix[i + 1][j - 2] !== VISITED_BOX_NUM) {
    availableMoves.push([i + 1, j - 2]);
  }
  if (i + 1 < M && j + 2 < M && matrix[i + 1][j + 2] !== VISITED_BOX_NUM) {
    availableMoves.push([i + 1, j + 2]);
  }

  return availableMoves;
}

function getAvailableMovesCount(i, j) {
  const availableMovesList = getAvailableMoves(i, j) || [];

  return availableMovesList.length;
}

function moveHorse() {
  const [i, j] = currentPosition;

  const availableMoves = getAvailableMoves(i, j);

  const [x, y] = getNextPosition(availableMoves);

  matrix[x][y] = VISITED_BOX_NUM;
  currentPosition = [x, y];
}

function getNextPosition(availableMoves) {
  if (!Array.isArray(availableMoves)) {
    return [];
  }

  let nextPosition;

  availableMoves.forEach(([i, j]) => {
    if (
      !nextPosition ||
      matrix[i][j] < matrix[nextPosition[0]][nextPosition[1]]
    ) {
      nextPosition = [i, j];
    }
  });

  return nextPosition;
}
