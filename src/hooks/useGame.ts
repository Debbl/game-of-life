import { useEffect, useRef, useState } from "react";
import type { TBoard, TSize } from "../types";
import { getAdjoinCount } from "../utils";

const useGame = () => {
  const [size, setSize] = useState<TSize>(16);
  const [board, setBoard] = useState([
    0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
  ] as TBoard);
  const [isStarting, setIsStarting] = useState(true);
  const intervalID = useRef<number>();

  const updateBoard = () => {
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
  };

  const handleClick = (i: number) => {
    setBoard((prev) => {
      const next = [...prev];
      if (next[i] === 0) next[i] = 1;
      else next[i] = 0;
      return next;
    });
  };
  const handleStart = () => {
    setIsStarting(true);
    intervalID.current = setInterval(updateBoard, 300);
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
    isStarting && handleStart();
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