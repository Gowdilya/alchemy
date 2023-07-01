import Circle from "../../BasicShapes/Circle";
import "./circleSource.css";
import { MouseEvent } from "react";

interface CircleSourceProps {
  rowId: number;
  colId: number;
  handleSourceClick: (rowId: number, colId: number) => void;
  color?: number[];
}
function CircleSource(props: CircleSourceProps) {
  return (
    <div
      title={props.color?.toString()}
      className="circleSource"
      onClick={() => props.handleSourceClick(props.rowId, props.colId)}
    >
      <Circle color={props.color} />
    </div>
  );
}

export default CircleSource;
