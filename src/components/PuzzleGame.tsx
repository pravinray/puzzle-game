import React, { useState, useEffect } from "react";

const PuzzleGame: React.FC = () => {
  const imgUrl =
    "https://fastly.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U";

  const [positions, setPositions] = useState<number[]>([...Array(16).keys()]);

  useEffect(() => {
    setPositions((prevPositions) => {
      const newPos = [...prevPositions];
      newPos.sort(() => Math.random() - 0.5);
      return newPos;
    });
  }, []);

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

  const isSolved = positions.every((pos, index) => pos === index);

  return (
    <>
      <div className="flex justify-center items-start gap-5">
        <div className="flex items-center justify-center border-4 border-solid border-stone-400 p-3 shadow-md">
          <img className="max-w-48 block" src={imgUrl} alt="Reference Image" />
        </div>
        <div className="w-96 h-96 grid gap-0.5 border-4 border-solid border-stone-400 bg-white shadow-md shadow-black grid-cols-4">
          {positions.map((pos, index) => {
            const x = (pos % 4) * 100;
            const y = Math.floor(pos / 4) * 100;
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
                  backgroundImage: `url('${imgUrl}')`,
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
