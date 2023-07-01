import "./square.css";

interface SquareProps {
  color?: number[];
}

const defaultProps = {
  color: [0, 0, 0], // defaultblack
};
function Square(props: SquareProps) {
  props = { ...defaultProps, ...props };
  return (
    <div
      className="square"
      title={props.color?.toString()}
      style={{ backgroundColor: `rgb(${props.color})` }}
    ></div>
  );
}

export default Square;
