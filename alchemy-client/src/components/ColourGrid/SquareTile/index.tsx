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
      style={props.isClosest ? { border: `2px solid red` } : {}}
    >
      <Square color={props.color} />
    </div>
  );
}

export default SquareTile;
