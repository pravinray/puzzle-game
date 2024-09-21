import React, { useEffect, useState } from "react";
import { useGameContext } from "../contexts/GameProvider";

interface TimerProps {
  onTimeUp: () => void;
}

const Timer: React.FC<TimerProps> = ({ onTimeUp }) => {
  const seconds: number = 30;
  const [time, setTime] = useState<any>();
  const { isSolved } = useGameContext();

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev: number) => {
        if (prev <= 1) {
          clearInterval(timer);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setTime(seconds);
    isSolved ? stopTimer() : resetTimer();
  }, [isSolved]);

  const stopTimer = () => {
    setTime("-");
  };

  const resetTimer = () => {
    setTime(seconds);
  };

  return (
    <>{!isSolved && <div className="text-center">Time Left: {time}s</div>}</>
  );
};

export default Timer;
