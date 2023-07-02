import React, { useState, useEffect } from "react";
import Square from "../BasicShapes/Square";

function Loading() {
  const [currentColorIndex, setCurrentColorIndex] = useState(0);
  const colors = [
    [0, 0, 0],
    [255, 0, 0],
    [0, 255, 0],
    [0, 0, 255],
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      <Square color={colors[currentColorIndex]} />
      <Square color={colors[(currentColorIndex + 1) % colors.length]} />
      <Square color={colors[(currentColorIndex + 2) % colors.length]} />
    </div>
  );
}

export default Loading;
