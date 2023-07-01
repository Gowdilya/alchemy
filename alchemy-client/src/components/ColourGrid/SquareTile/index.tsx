import Square from "../../BasicShapes/Square";
import "./squareTile.css";

interface SquareTileProps {
  colId: number;
  rowId: number;
  color?: number[];
  isClosest: boolean;
}
function SquareTile(props: SquareTileProps) {
  return (
    <div
      title={props.color?.toString()}
      className={"squareTile"}
      style={props.isClosest ? { border: `1px solid red` } : {}}
    >
      <Square color={props.color} />
    </div>
  );
}

export default SquareTile;
