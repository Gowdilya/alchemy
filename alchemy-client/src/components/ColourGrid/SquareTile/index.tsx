import Square from "../../BasicShapes/Square";
import "./squareTile.css";

interface SquareTileProps {
  colId: number;
  rowId: number;
  tileColor?: number[];
}
function SquareTile(props: SquareTileProps) {
  return (
    <div className="squareTile">
      <Square color={props.tileColor} />
    </div>
  );
}

export default SquareTile;
