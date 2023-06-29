import GridSquare from "./GridSquare";
import BorderCircle from "./BorderCircle";
interface GridProps {
  gridHeight: number;
  gridWidth: number;
}

function ColourGrid(props: GridProps) {
  const createCirclesHorizontal = (rowId: number) => {
    const gridElements = [];
    for (let i = 1; i < props.gridWidth; i++) {
      gridElements.push(<BorderCircle rowId={rowId} colId={i} />);
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
          <BorderCircle rowId={i} colId={0} />
          {createGridRow(i)}
          <BorderCircle rowId={i} colId={props.gridWidth} />
        </div>
      );
    }
    return gridElements;
  };

  console.log(props);
  return (
    <div>
      Colour Grid
      <div>{createCirclesHorizontal(0)}</div>
      {createSquareRows()}
      <div>{createCirclesHorizontal(props.gridHeight)}</div>
    </div>
  );
}

export default ColourGrid;
