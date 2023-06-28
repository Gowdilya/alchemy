import "./square.css";

interface SquareProps {
  color: number[];
}
function Square(props: SquareProps) {
  return (
    <div className="square" style={{ background: `rgb(${props.color})` }}></div>
  );
}

export default Square;
