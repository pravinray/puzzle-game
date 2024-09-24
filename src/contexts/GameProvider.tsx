import React, { createContext, useState, useContext, ReactNode } from "react";
import { GameContextType, GameProviderProps } from "../types/types";

// Default values for context
const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const [isSolved, setIsSolved] = useState<boolean>(false);

  return (
    <GameContext.Provider
      value={{
        isSolved,
        setIsSolved,
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
