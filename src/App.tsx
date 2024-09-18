import React, { useState } from "react";
import PuzzleGame from "./components/PuzzleGame";
import "./App.css";

const App: React.FC = () => {

  return (
    <div className="App p-4">
      <h1 className="text-2xl font-bold mb-4">Puzzle Game</h1>
      <PuzzleGame />
    </div>
  );
};

export default App;
