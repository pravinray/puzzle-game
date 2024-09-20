import React, { createContext, useState, useContext, ReactNode } from "react";

// Context's data type
interface GameContextType {
  gridSize: number;
  score: number;
  gameOver: boolean;
  isSolved: boolean;
  setGridSize: (size: number) => void;
  setScore: (score: number) => void;
  setGameOver: (status: boolean) => void;
  setIsSolved: (status: boolean) => void;
}

// Default values for context
const GameContext = createContext<GameContextType | undefined>(undefined);

interface GameProviderProps {
  children: ReactNode;
}

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const [gridSize, setGridSize] = useState<number>(2);
  const [score, setScore] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [isSolved, setIsSolved] = useState<boolean>(false);

  return (
    <GameContext.Provider
      value={{
        gridSize,
        score,
        gameOver,
        isSolved,
        setGridSize,
        setScore,
        setGameOver,
        setIsSolved
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = (): GameContextType => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGameContext must be used within a GameProvider");
  }
  return context;
};
