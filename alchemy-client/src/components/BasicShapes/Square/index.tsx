import "./square.css";

interface SquareProps {
  color?: number[];
  selected?: boolean;
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
      style={{
        backgroundColor: `rgb(${props.color})`,
        border: `2px solid ${props.selected ? "red" : "lightgrey"}`,
      }}
    ></div>
  );
}

export default Square;
