import { useEffect, useRef, useState } from "react";
import type { TBoard, TSize } from "../types";
import { getAdjoinCount } from "../utils";

const useGame = () => {
  const [size, setSize] = useState<TSize>(16);
  const [board, setBoard] = useState(
    Array.from({ length: size * size }).fill(0) as TBoard
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
    setBoard(Array.from({ length: value * value }).fill(0) as TBoard);
    handleStop();
  };

  useEffect(() => {
    return () => {
      handleStop();
    };
  }, []);
  return {
    board,
    size,
    isStarting,
    handleClick,
    handleStart,
    handleStop,
    handleSelect,
  };
};

export { useGame };
