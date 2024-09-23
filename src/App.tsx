import React from "react";
import "./App.css";
import Auth from "./components/Auth";
import PuzzleGame from "./components/PuzzleGame";

const App: React.FC = () => {
  return (
    <div className="App p-4">
      <Auth />
      <PuzzleGame />
    </div>
  );
};

export default App;
