import React, { useEffect, useState } from 'react';

interface TimerProps {
  onTimeUp: () => void;
}

const Timer: React.FC<TimerProps> = ({ onTimeUp }) => {
  const [time, setTime] = useState<number>(160);


  useEffect(() => {
    const timer = setInterval(() => {
      setTime(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onTimeUp]);

  return <div className="text-center">Time Left: {time}s</div>;
};

export default Timer;
