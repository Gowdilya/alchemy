import React, { useState } from "react";
import Square from "../BasicShapes/Square";
import ColourGrid from "../ColourGrid";
interface RGBProps {
  data: {
    userId: string;
    width: number;
    height: number;
    maxMoves: number;
    target: number[];
  };
}

function RGBAlchemy(props: RGBProps) {
  const [moveCount, setMoveCount] = useState<number>(0);

  const handleMovePlus = () => {
    setMoveCount((moveCount: number) => moveCount + 1);
  };

  return (
    <div className="RGB Alchemy">
      <b>RGB Alchemy</b>
      <div>User ID:{props.data.userId}</div>
      <div>Moves left:{props.data.maxMoves - moveCount}</div>
      <div>
        Target color:
        <Square color={props.data.target} />
      </div>
      <ColourGrid
        gridWidth={props.data.width}
        gridHeight={props.data.height}
        targetColor={props.data.target}
        moveCount={moveCount}
        handleMoveMade={handleMovePlus}
      />
    </div>
  );
}

export default RGBAlchemy;
