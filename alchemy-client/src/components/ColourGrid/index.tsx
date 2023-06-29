import GridSquare from "./SquareTile";
import CircleSource from "./CircleSource";
interface GridProps {
  gridHeight: number;
  gridWidth: number;
}
/***
 * This component creates game layout with the circle and square tiles
 */
function ColourGrid(props: GridProps) {
  const createCirclesHorizontal = (rowId: number) => {
    const gridElements = [];
    for (let i = 1; i < props.gridWidth; i++) {
      gridElements.push(<CircleSource rowId={rowId} colId={i} />);
    }
    return gridElements;
  };
  const createGridRow = (rowId: number) => {
    const gridElements = [];
    for (let i = 1; i < props.gridWidth; i++) {
      gridElements.push(<GridSquare rowId={rowId} colId={i} />);
    }
    return gridElements;
  };

  const createSquareRows = () => {
    const gridElements = [];
    for (let i = 1; i < props.gridHeight; i++) {
      gridElements.push(
        <div>
          <CircleSource rowId={i} colId={0} />
          {createGridRow(i)}
          <CircleSource rowId={i} colId={props.gridWidth} />
        </div>
      );
    }
    return gridElements;
  };

  console.log(props);
  /** Note the top and bottom row only has circles Tiles, so we use the createCirclesHorizontal, first and last  */
  return (
    <div>
      <div>{createCirclesHorizontal(0)}</div>
      {createSquareRows()}
      <div>{createCirclesHorizontal(props.gridHeight)}</div>
    </div>
  );
}

export default ColourGrid;
