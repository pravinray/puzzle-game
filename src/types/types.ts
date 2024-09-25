import { ReactNode } from "react";

type GameContextType = {
  isSolved: boolean;
  setIsSolved: (status: boolean) => void;
};

type GameProviderProps = {
  children: ReactNode;
};

type ScoreLevel =
  | "Excellent"
  | "Good Job"
  | "You Can Do Better"
  | "Please Try Again";

type GameState = {
  level: number;
  incorrectMoves: number;
  timeLeft: number;
  scoreLevel: ScoreLevel | null;
  failuresInARow: number;
};

type ScoreProps = {
  controlIncorrectMove: number;
  randomImageAndShufflePositions: () => void;
};

type PreviewProps = {
  currentImage: string;
};

export type {
  GameContextType,
  GameProviderProps,
  ScoreLevel,
  GameState,
  ScoreProps,
  PreviewProps,
};
