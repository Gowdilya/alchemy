import "./circle.css";

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
      className="circle"
      style={{ backgroundColor: `rgb(${props.color})` }}
    ></div>
  );
}

export default Circle;
