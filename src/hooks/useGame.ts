import { useCallback, useEffect, useRef } from "react";
import type { TBoard, TSize } from "../types";
import { getAdjoinCount } from "../utils";
import patterns from "../assets/patterns.json";
import useLocalStorageState from "./useLocalStorageState";

const initPattern = patterns["16"]["00"] as any as TBoard;

function useGame() {
  const [size, setSize] = useLocalStorageState<TSize>("size", 16);
  const [board, setBoard] = useLocalStorageState(
    "board",
    initPattern as any as TBoard
  );
  const [isStarting, setIsStarting] = useLocalStorageState("isStarting", true);
  const intervalID = useRef<number>();

  const updateBoard = useCallback(() => {
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
  }, [setBoard, size]);
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
  };
  const handleStop = () => {
    setIsStarting(false);
  };
  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = +e.target.value as any as TSize;
    setSize(value);
    setBoard(Array.from({ length: value * value }).fill(0) as TBoard);
    handleStop();
  };
  const handleReset = () => {
    handleStop();
    setBoard(Array.from({ length: size * size }).fill(0) as TBoard);
  };
  const handleInit = () => {
    if (size === 16) {
      handleStop();
      setBoard(initPattern as any as TBoard);
    } else {
      handleReset();
    }
  };

  useEffect(() => {
    if (isStarting) {
      intervalID.current = setInterval(updateBoard, 300);
    } else {
      clearInterval(intervalID.current);
    }
    return () => {
      clearInterval(intervalID.current);
    };
  }, [isStarting, updateBoard]);

  return {
    board,
    size,
    isStarting,
    handleInit,
    updateBoard,
    handleClick,
    handleStart,
    handleStop,
    handleSelect,
    handleReset,
  };
}

export { useGame };
