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
      className={`h-7 w-7 inline-block border-2 ${
        props.selected ? "border-red-500" : "border-lightgrey"
      }`}
      style={{ backgroundColor: `rgb(${props.color})` }} // Can't set dynamic values with tailwind
      title={props.color?.toString()}
    ></div>
  );
}

export default Square;
