import Square from "../../BasicShapes/Square";
import "./gridSquare.css";

interface GridSquareProps {
  colId: number;
  rowId: number;
}
function GridSquare(props: GridSquareProps) {
  console.log("colID:" + props.colId + "rowID:" + props.rowId);
  return (
    <div className="gridSquare">
      <Square />
    </div>
  );
}

export default GridSquare;
