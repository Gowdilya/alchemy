import Square from "../../BasicShapes/Square";
import "./squareTile.css";

interface SquareTileProps {
  colId: number;
  rowId: number;
  tileColor?: number[];
  isClosest: boolean;
}
function SquareTile(props: SquareTileProps) {
  return (
    <div
      className={"squareTile"}
      style={props.isClosest ? { border: `1px solid red` } : {}}
    >
      <Square color={props.tileColor} />
    </div>
  );
}

export default SquareTile;
