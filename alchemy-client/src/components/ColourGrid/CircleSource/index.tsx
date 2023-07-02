import Circle from "../../BasicShapes/Circle";
import "./circleSource.css";
import { MouseEvent } from "react";

interface CircleSourceProps {
  rowId: number;
  colId: number;
  handleSourceClick: (rowId: number, colId: number) => void;
  color?: number[];
  handleSourceDrop: (color: number[], rowId: number, colId: number) => void;
  isClickable: boolean;
}

function CircleSource(props: CircleSourceProps) {
  const enableDropping = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    const newColor = event.dataTransfer.getData("text");
    var colorArray = newColor.split(",").map(Number);
    props.handleSourceDrop(colorArray, props.rowId, props.colId);
  };

  return (
    <div
      onDragOver={enableDropping}
      onDrop={handleDrop}
      className="circleSource"
      onClick={() => props.handleSourceClick(props.rowId, props.colId)}
      style={{ cursor: props.isClickable ? "pointer" : "default" }}
    >
      <Circle color={props.color} />
    </div>
  );
}

export default CircleSource;
