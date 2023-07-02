import Square from "../../BasicShapes/Square";
import "./squareTile.css";

interface SquareTileProps {
  colId: number;
  rowId: number;
  color?: number[];
  isClosest: boolean;
  isDraggable: boolean;
}
function SquareTile(props: SquareTileProps) {
  const drag = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData(
      "text",
      props.color ? props.color?.toString() : ""
    );
  };
  return (
    <div
      draggable={props.isDraggable}
      onDragStart={drag}
      className={"squareTile"}
    >
      <Square color={props.color} selected={props.isClosest} />
    </div>
  );
}

export default SquareTile;
