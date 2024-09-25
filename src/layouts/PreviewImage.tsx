import React, { useState } from "react";
import { PreviewProps } from "../types/types";

const PreviewIMage: React.FC<PreviewProps> = ({ currentImage }) => {
  const [points, setPoints] = useState<number>(3);
  const [showPreview, setShowPreview] = useState<boolean>(false);

  // Function to show the image preview and handle points
  const handlePreview = () => {
    if (points > 0) {
      setShowPreview(true);
      setPoints(points - 1);

      // Hide the preview after 5 seconds
      setTimeout(() => {
        setShowPreview(false);
      }, 5000);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-2">Preview Image</h1>

      <div className="mt-4">
        <img
          src={currentImage}
          alt="Image Preview"
          className={`w-64 h-auto ${!showPreview && "blur-md"}`} // handling image bluring if no points left
        />
      </div>

      <div className="my-2 ">
        <p>Points Left To Preview: {points}</p>
      </div>

      <button
        className={` bg-blue-500 text-white py-2 px-4 rounded ${
          points === 0 ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={handlePreview}
        disabled={points === 0}
      >
        {points > 0 ? "Preview Image" : "No more previews"}
      </button>
    </div>
  );
};

export default PreviewIMage;
