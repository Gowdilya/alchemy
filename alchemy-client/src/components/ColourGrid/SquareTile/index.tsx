import Square from "../../BasicShapes/Square";
import "./squareTile.css";

interface SquareTileProps {
  colId: number;
  rowId: number;
}
function SquareTile(props: SquareTileProps) {
  console.log("colID:" + props.colId + "rowID:" + props.rowId);
  return (
    <div className="squareTile">
      <Square />
    </div>
  );
}

export default SquareTile;
