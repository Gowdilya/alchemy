import Circle from "../../BasicShapes/Circle";
import "./circleSource.css";
import { MouseEvent } from "react";

interface CircleSourceProps {
  rowId: number;
  colId: number;
  handleSourceClick: (rowId: number, colId: number) => void;
  sourceColor?: number[];
}
function CircleSource(props: CircleSourceProps) {
  return (
    <div
      className="circleSource"
      onClick={() => props.handleSourceClick(props.rowId, props.colId)}
    >
      <Circle color={props.sourceColor} />
    </div>
  );
}

export default CircleSource;
