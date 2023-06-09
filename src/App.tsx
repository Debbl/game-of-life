import { useGame } from "./hooks/useGame";

function App() {
  const {
    board,
    size,
    isStarting,
    handleSelect,
    handleStart,
    handleStop,
    handleClick,
  } = useGame();

  return (
    <div className="py-6">
      <div className="flex justify-center">
        <div className="flex gap-x-2 items-center">
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
