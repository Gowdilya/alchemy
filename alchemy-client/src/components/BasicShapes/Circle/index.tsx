interface CircleProps {
  color?: number[];
}
const defaultProps = {
  color: [0, 0, 0], // defaultblack
};

function Circle(props: CircleProps) {
  props = { ...defaultProps, ...props };
  return (
    <div
      title={props.color?.toString()}
      className="h-7 w-7 inline-block border-2 border-solid border-lightgrey rounded-full"
      style={{ backgroundColor: `rgb(${props.color})` }}
    ></div>
  );
}

export default Circle;
