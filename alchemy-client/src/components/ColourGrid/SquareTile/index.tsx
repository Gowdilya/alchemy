import Square from "../../BasicShapes/Square";

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
      className={"inline-block m-0.5"}
      style={{ cursor: props.isDraggable ? "pointer" : "default" }}
    >
      <Square color={props.color} selected={props.isClosest} />
    </div>
  );
}

export default SquareTile;
