import { useEffect, useRef, useState } from "react";

export type TSize = 16 | 32 | 64;

function App() {
  const [size, setSize] = useState<TSize>(16);
  const [board, setBoard] = useState(
    Array.from({ length: size * size }).fill(0) as (0 | 1)[]
  );
  const [isStarting, setIsStarting] = useState(false);
  const intervalID = useRef<number>();
  const handleClick = (i: number) => {
    setBoard((prev) => {
      const next = [...prev];
      next[i] = 1;
      return next;
    });
  };
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
  const handleStart = () => {
    intervalID.current = setInterval(() => {
      setIsStarting(true);
      setBoard((prevBoard) => {
        const nextBoard = [...prevBoard];
        prevBoard.forEach((b, i) => {
          const count = getAdjoinCount(i, prevBoard, size);
          if (b === 0 && count === 3) {
            nextBoard[i] = 1;
          } else if (b === 1 && (count < 2 || count > 3)) {
            nextBoard[i] = 0;
          }
        });
        return nextBoard;
      });
    }, 300);
  };
  const handleStop = () => {
    setIsStarting(false);
    intervalID.current && clearInterval(intervalID.current);
  };
  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = +e.target.value as any as TSize;
    setSize(value);
    setBoard(Array.from({ length: value * value }).fill(0) as (0 | 1)[]);
    handleStop();
  };
  useEffect(() => {
    return () => {
      handleStop();
    };
  }, []);

  return (
    <div>
      <div className="flex justify-center">
        <div className="flex gap-x-2 py-4 items-center">
          <button
            className="btn"
            onClick={() => handleStart()}
            disabled={isStarting}
          >
            start
          </button>
          <button
            className="btn"
            onClick={() => handleStop()}
            disabled={!isStarting}
          >
            stop
          </button>
          <label>
            size:
            <select
              onChange={handleSelect}
              defaultValue={16}
              className="border ml-3"
            >
              <option value={16}>16</option>
              <option value={32}>32</option>
              <option value={64}>64</option>
            </select>
          </label>
        </div>
      </div>
      <div
        className={`flex mx-auto ${
          size === 16 ? "w-[32rem]" : size === 32 ? "w-[48rem]" : "w-[64rem]"
        } flex-wrap items-start mt-6`}
      >
        {board.map((b, i) => (
          <div key={i} className="flex">
            <button
              className={`border ${
                size === 16 ? "w-8 h-8" : size === 32 ? "w-6 h-6" : "w-4 h-4"
              } ${b === 1 && "bg-black"}`}
              onClick={() => handleClick(i)}
            ></button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
