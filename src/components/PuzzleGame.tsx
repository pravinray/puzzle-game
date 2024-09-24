import React, { useState, useEffect } from "react";
import { useGameContext } from "../contexts/GameProvider";
import ScoreWithTime from "../layouts/ScoreWithTime";
import { DEFAULT_GRID, IMAGES } from "../constants/constants";

const PuzzleGame: React.FC = () => {
  // const scoreRef: any = useRef<HTMLDivElement | null>(null);

  const gridSize: number =
    Number(sessionStorage.getItem("currentGrid")) || DEFAULT_GRID;

  const [positions, setPositions] = useState<number[]>([
    ...Array(gridSize * gridSize).keys(),
  ]);

  const [currentImage, setCurrentImage] = useState<string>("");
  const [trigger, setTrigger] = useState<number>(0);

  const { isSolved, setIsSolved } = useGameContext();

  useEffect(() => {
    selectRandomImageAndShufflePositions();
  }, []);

  const selectRandomImageAndShufflePositions = () => {
    const imageIndex = Math.floor(Math.random() * IMAGES.length);
    setCurrentImage(IMAGES[imageIndex]);
    setPositions((prevPositions) => {
      const newPos = [...prevPositions];
      newPos.sort(() => Math.random() - 0.5);
      return newPos;
    });
  };

  useEffect(() => {
    const checkIfSolved = positions.every((pos, index) => pos === index);
    setIsSolved(checkIfSolved);
  }, [positions]);

  // Handling the start of a drag event
  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    position: any
  ) => {
    e.dataTransfer.setData("text/plain", position);
  };

  // Handling the drop event
  const handleDrop = (e: React.DragEvent<HTMLDivElement>, position: number) => {
    e.preventDefault();
    const originalPosition: any = e.dataTransfer.getData("text");
    setPositions((prevPositions) => {
      const newPos = [...prevPositions];
      [newPos[originalPosition], newPos[position]] = [
        newPos[position],
        newPos[originalPosition],
      ];

      if (newPos[position] !== position) {
        setTrigger(trigger + 1);
      }
      return newPos;
    });
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <ScoreWithTime
        controlIncorrectMove={trigger}
        randomImageAndShufflePositions={selectRandomImageAndShufflePositions}
      />
      <div className="flex justify-center items-start gap-5">
        <div className="flex items-center justify-center border-4 border-solid border-stone-400 p-3 shadow-md">
          <img className="max-w-48 block" src={currentImage} alt="Reference" />
        </div>

        <div
          className="w-96 h-96 grid gap-0.5 border-4 border-solid border-stone-400 bg-white shadow-md
         shadow-black"
          style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}
        >
          {positions.map((pos, index) => {
            const x = (pos % gridSize) * 100;
            const y = Math.floor(pos / gridSize) * 100;
            return (
              <div
                id={`pos-${pos} idx-${index}`}
                key={index}
                className="w-full h-full bg-[length:400px_400px] cursor-grab shadow-black shadow-inner "
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDrop={(e) => handleDrop(e, index)}
                onDragOver={handleDragOver}
                style={{
                  backgroundImage: `url('${currentImage}')`,
                  backgroundPosition: `-${x}px -${y}px`,
                  border: pos === index ? "4px solid green" : "none",
                }}
              />
            );
          })}
        </div>
      </div>
      {isSolved && (
        <div className="flex justify-center text-green-500 font-bold flex-row text-xl mt-2">
          Congratulations! Puzzle Solved!
        </div>
      )}
    </>
  );
};

export default PuzzleGame;
