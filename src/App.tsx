import React from "react";
import PuzzleGame from "./components/PuzzleGame";
import "./App.css";
import Timer from "./components/Timer";
import { useGameContext } from "./contexts/GameProvider";

const App: React.FC = () => {
  const { gameOver, setGameOver } = useGameContext();

  const handleGameOver = () => {
    setGameOver(true);
  };

  return (
    <div className="App p-4">
      <h1 className="text-2xl font-bold mb-4">Puzzle Game</h1>

      {!gameOver && (
        <>
          <Timer onTimeUp={handleGameOver} />
          <PuzzleGame />
        </>
      )}
      {gameOver && <div className="text-red-600">Game Over! Try Again.</div>}
    </div>
  );
};

export default App;
