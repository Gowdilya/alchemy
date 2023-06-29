import Square from "../../BasicShapes/Square";
import "./squareTile.css";

interface SquareTileProps {
  colId: number;
  rowId: number;
}
function SquareTile(props: SquareTileProps) {
  return (
    <div className="squareTile">
      <Square />
    </div>
  );
}

export default SquareTile;
