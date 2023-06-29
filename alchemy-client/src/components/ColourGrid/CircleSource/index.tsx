import Circle from "../../BasicShapes/Circle";
import "./circleSource.css";

interface CircleSourceProps {
  colId: number;
  rowId: number;
}
function CircleSource(props: CircleSourceProps) {
  console.log("colID:" + props.colId + "rowID:" + props.rowId);
  return (
    <div className="circleSource">
      <Circle />
    </div>
  );
}

export default CircleSource;
