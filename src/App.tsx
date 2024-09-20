import React from "react";
import PuzzleGame from "./components/PuzzleGame";
import "./App.css";
import Timer from "./components/Timer";
import { useGameContext } from "./contexts/GameProvider";
import Auth from "./components/Auth";

const App: React.FC = () => {
  const { gameOver, setGameOver } = useGameContext();

  const handleGameOver = () => {
    setGameOver(true);
  };

  return (
    <div className="App p-4">
      <h1 className="text-2xl font-bold mb-4">Puzzle Game</h1>

      <Auth />
      {!gameOver && (
        <>
          <Timer onTimeUp={handleGameOver} />
          <PuzzleGame />
        </>
      )}
      {gameOver && (
        <div className="text-red-600">
          Time Up!{" "}
          <button
            className=" bg-blue-500 text-white p-2 rounded "
            onClick={() => window.location.reload()}
          >
            {" "}
            Play Again
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
