import { useGame } from "./hooks/useGame";

function App() {
  const {
    board,
    size,
    isStarting,
    updateBoard,
    handleSelect,
    handleStart,
    handleStop,
    handleClick,
    handleReset,
  } = useGame();

  return (
    <div className="py-6">
      <div className="flex justify-center">
        <div className="flex items-center gap-x-2">
          <button
            className="btn w-16"
            onClick={() => (isStarting ? handleStop() : handleStart())}
          >
            {isStarting ? "stop" : "start"}
          </button>
          <button className="btn" onClick={() => handleReset()}>
            reset
          </button>
          <button
            className="btn"
            onClick={() => updateBoard()}
            disabled={isStarting}
          >
            next
          </button>
          <label>
            size:
            <select
              onChange={handleSelect}
              defaultValue={16}
              className="ml-3 border"
            >
              <option value={16}>16</option>
              <option value={32}>32</option>
              <option value={64}>64</option>
            </select>
          </label>
        </div>
      </div>
      <div
        className={`mx-auto flex ${
          size === 16 ? "w-[32rem]" : size === 32 ? "w-[48rem]" : "w-[64rem]"
        } mt-6 flex-wrap items-start`}
      >
        {board.map((b, i) => (
          <div key={i} className="flex">
            <button
              className={`border ${
                size === 16 ? "h-8 w-8" : size === 32 ? "h-6 w-6" : "h-4 w-4"
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
