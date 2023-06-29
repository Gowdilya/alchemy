import Circle from "../../BasicShapes/Circle";
import "./borderCircle.css";

interface BorderCircleProps {
  colId: number;
  rowId: number;
}
function BorderCircle(props: BorderCircleProps) {
  console.log("colID:" + props.colId + "rowID:" + props.rowId);
  return (
    <div className="borderCircle">
      <Circle />
    </div>
  );
}

export default BorderCircle;
