import React, { useState, useEffect } from "react";
import { useGameContext } from "../contexts/GameProvider";

const PuzzleGame: React.FC = () => {
  const images: string[] = [
    "https://fastly.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U",
    "https://fastly.picsum.photos/id/17/2500/1667.jpg?hmac=HD-JrnNUZjFiP2UZQvWcKrgLoC_pc_ouUSWv8kHsJJY",
    "https://fastly.picsum.photos/id/26/4209/2769.jpg?hmac=vcInmowFvPCyKGtV7Vfh7zWcA_Z0kStrPDW3ppP0iGI",
    "https://fastly.picsum.photos/id/164/1200/800.jpg?hmac=wkqGUkaeW3kiAsHq_VwxSWWossIMAwFV4eUfFzuDkew",
    "https://fastly.picsum.photos/id/175/2896/1944.jpg?hmac=djMSfAvFgWLJ2J3cBulHUAb4yvsQk0d4m4xBJFKzZrs",
    "https://fastly.picsum.photos/id/183/2316/1544.jpg?hmac=908ZBWKqGdL9kio38tCq2ViwMm3DjLUtkjU_6SWNa9k",
    "https://fastly.picsum.photos/id/315/2100/1500.jpg?hmac=-04N-t7k_WwNeI30ryvWT4KGzy7XVdsw41fNRDFizck",
    "https://fastly.picsum.photos/id/364/5000/2917.jpg?hmac=xXeSnI5JaHB8KssawSc9gjgKEorKVXx7T_YgPCf2F-A",
    "https://fastly.picsum.photos/id/395/4080/2720.jpg?hmac=6ybpNpyHLfr4TMOiCDCk-hXBFVHPrOnOc5k-QIrspjY",
    "https://fastly.picsum.photos/id/419/3456/2304.jpg?hmac=RXPdqWRwlAeofpGH8aDVH7Yz7h2VklC82ppVCx5wnKk",
  ];

  const gridSize = 4;

  const [positions, setPositions] = useState<number[]>([
    ...Array(gridSize * gridSize).keys(),
  ]);

  const [currentImage, setCurrentImage] = useState<string>("");

  const { isSolved, setIsSolved } = useGameContext();

  useEffect(() => {
    setPositions((prevPositions) => {
      const newPos = [...prevPositions];
      newPos.sort(() => Math.random() - 0.5);
      return newPos;
    });
    selectRandomImage();
  }, []);

  const selectRandomImage = () => {
    const imageIndex = Math.floor(Math.random() * images.length);
    setCurrentImage(images[imageIndex]);
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
      return newPos;
    });
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="flex justify-center items-start gap-5">
        <div className="flex items-center justify-center border-4 border-solid border-stone-400 p-3 shadow-md">
          <img
            className="max-w-48 block"
            src={currentImage}
            alt="Reference Image"
          />
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
        <div className="flex justify-center text-green-500 flex-row text-xl mt-10">
          Congratulations! Puzzle Solved!
        </div>
      )}
    </>
  );
};

export default PuzzleGame;
