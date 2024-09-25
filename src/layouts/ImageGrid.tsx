import React, { useEffect, useState } from "react";
import { DEFAULT_GRID } from "../constants/constants";

const ImageGrid: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [gridList, setGridList] = useState<number[]>([]);

  const gridSize: number =
    Number(sessionStorage.getItem("currentGrid")) || DEFAULT_GRID;

  useEffect(() => {
    const gridList: number[] = [
      ...Array(11)
        .fill("")
        .map((value, index) => index + 2),
    ];
    setGridList(gridList);
  }, []);

  const toggleDropdown = (): void => {
    setIsOpen(!isOpen);
  };

  const handleOptions = (index: number) => {
    sessionStorage.setItem("currentGrid", `${gridList[index]}`);
    window.location.reload();
  };

  return (
    <div className="relative text-left">
      Change Complexity
      <button
        onClick={toggleDropdown}
        className="inline-flex justify-center w-full px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        {gridSize ? `${gridSize} * ${gridSize}` : "Select"}
      </button>
      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div
            className="py-1"
            role=""
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {gridList.map((option, index) => (
              <a
                href="#"
                key={index}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role=""
                onClick={() => handleOptions(index)}
              >
                {option} * {option}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGrid;
