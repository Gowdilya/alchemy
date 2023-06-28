import React from "react";
import Square from "../square";
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
  console.log(props);
  return (
    <div className="RGB Alchemy">
      <b>RGB Alchemy</b>
      <div>User ID:{props.data.userId}</div>
      <div>Moves left:{props.data.maxMoves}</div>
      <div>
        Taget color:
        <Square color={props.data.target} />
      </div>
      Closest color:
    </div>
  );
}

export default RGBAlchemy;
