import type { TSize } from "../types";

const getAdjoinCount = (i: number, board: (0 | 1)[], size: TSize) => {
  const adjoin = [
    board[i - size - 1],
    board[i - size],
    board[i - size + 1],
    board[i - 1],
    board[i + 1],
    board[i + size - 1],
    board[i + size],
    board[i + size + 1],
  ];
  let adjoinCount = 0;
  for (let j = 0; j < adjoin.length; j++) {
    if (
      (j === 0 && i % size !== 0 && i >= size) ||
      (j === 1 && i >= size) ||
      (j === 2 && i % size !== size - 1 && i >= size) ||
      (j === 3 && i % size !== 0) ||
      (j === 4 && i % size !== size - 1) ||
      (j === 5 && i % size !== 0 && i < size * (size - 1)) ||
      (j === 6 && i < size * (size - 1)) ||
      (j === 7 && i % size !== size - 1 && i < size * (size - 1))
    ) {
      adjoinCount += adjoin[j];
    }
  }

  return adjoinCount;
};

export { getAdjoinCount };
