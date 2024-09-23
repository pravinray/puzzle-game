import React, { useState, useEffect } from "react";
import { useGameContext } from "../contexts/GameProvider";

type ScoreLevel =
  | "Excellent"
  | "Good Job"
  | "You Can Do Better"
  | "Please Try Again";

interface GameState {
  level: number;
  incorrectMoves: number;
  timeLeft: number;
  scoreLevel: ScoreLevel | null;
  failuresInARow: number;
}

interface ScoreProps {
  controlIncorrectMove: number;
  randomImageAndShufflePositions: () => void;
}

const MAX_LEVEL = 10;
const START_TIME = 300;

const ScoreWithTime: React.FC<ScoreProps> = ({ controlIncorrectMove, randomImageAndShufflePositions }) => {
  const { isSolved } = useGameContext();

  const [gameState, setGameState] = useState<GameState>(() => {
    const savedGameState = localStorage.getItem("gameState");
    return savedGameState
      ? JSON.parse(savedGameState)
      : {
          level: 1,
          incorrectMoves: 0,
          timeLeft: START_TIME,
          scoreLevel: null,
          failuresInARow: 0,
        };
  });
  const { level, incorrectMoves, timeLeft, scoreLevel, failuresInARow } =
    gameState;

  useEffect(() => {
    const timer = setInterval(() => {
      setGameState((prev) => ({
        ...prev,
        timeLeft: prev.timeLeft > 0 ? prev.timeLeft - 1 : 0,
      }));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    localStorage.setItem("gameState", JSON.stringify(gameState));
  }, [gameState]);

  useEffect(() => {
    if (controlIncorrectMove > 0) {
      handleIncorrectMove();
    }
  }, [controlIncorrectMove]);

  // Logic to calculate score based on time and incorrect moves
  const calculateScoreLevel = (
    timeLeft: number,
    incorrectMoves: number
  ): ScoreLevel => {
    const timePercentage = (timeLeft / START_TIME) * 100;

    if (isSolved) {
      if (timePercentage <= 30 && incorrectMoves === 0) {
        return "Excellent";
      } else if (timePercentage <= 50 && incorrectMoves <= 3) {
        return "Good Job";
      } else if (timePercentage <= 99 && incorrectMoves <= 6) {
        return "You Can Do Better";
      } else {
        return "Please Try Again";
      }
    } else {
      return "Please Try Again";
    }
  };

  // logic to handle incorrect moves
  const handleIncorrectMove = () => {
    console.log("inside handle incorrect move");

    setGameState((prev) => ({
      ...prev,
      incorrectMoves: prev.incorrectMoves + 1,
      timeLeft: prev.timeLeft >= 10 ? prev.timeLeft - 10 : 0, // 10 seconds penalty on every wrong moves
    }));
  };

  // completing the level
  const completeLevel = (): void => {
    randomImageAndShufflePositions();

    const newScoreLevel = calculateScoreLevel(timeLeft, incorrectMoves);

    if (newScoreLevel === "Please Try Again" || timeLeft === 0) {
      setGameState((prev) => {
        const newFailuresInARow = prev.failuresInARow + 1;

        // Restart the game if user fails 3 times in a row
        if (newFailuresInARow >= 3) {
          localStorage.clear();
          return {
            level: 1,
            incorrectMoves: 0,
            timeLeft: START_TIME,
            scoreLevel: null,
            failuresInARow: 0,
          };
        }

        return {
          ...prev,
          incorrectMoves: 0,
          timeLeft: START_TIME - prev.level * 30, // Decrease time by 30 seconds per level
          failuresInARow: newFailuresInARow,
        };
      });
    } else {
      // Proceed to next level if the score is good
      setGameState((prev) => ({
        ...prev,
        level: prev.level + 1 > MAX_LEVEL ? 1 : prev.level + 1,
        incorrectMoves: 0,
        timeLeft: START_TIME - prev.level * 30, // Reduce time for next level
        scoreLevel: newScoreLevel,
        failuresInARow: 0,
      }));
    }
  };

  return (
    <div>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold text-center">Puzzle Game</h1>
        <div className="mt-4 flex flex-col items-center">
          <p className="text-lg">Level: {level}</p>
          <p className="text-lg ">
            Time Left:{" "}
            <span
              className={
                timeLeft < 4 ? "animate-blink text-red-500 font-bold" : ""
              }
            >
              {" "}
              {timeLeft}s
            </span>
          </p>
          <p className="text-lg">Incorrect Moves: {incorrectMoves}</p>
          <p className="text-lg">Score: {scoreLevel || "Not Yet Scored"}</p>
        </div>

        <div className="mt-6 flex justify-center">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={completeLevel}
          >
            Complete Level
          </button>
        </div>

        {failuresInARow >= 3 && (
          <div className="mt-4 text-center">
            <p className="text-red-500">Game Over! Restarting...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScoreWithTime;
