import GridSquare from "./SquareTile";
import CircleSource from "./CircleSource";
import { useState, MouseEvent } from "react";
interface GridProps {
  gridHeight: number;
  gridWidth: number;
}
/***
 * This component creates game layout with the circle and square tiles
 */
function ColourGrid(props: GridProps) {
  const [moveCount, setMoveCount] = useState<number>(1);
  const [sourceMap, setSourceMap] = useState(new Map());
  //This is done to trigger a rerender, new Map must be created so the pointer changes
  const updateMap = (k: string, v: number[]) => {
    setSourceMap(new Map(sourceMap.set(k, v)));
  };
  const createCirclesHorizontal = (rowId: number) => {
    const gridElements = [];
    for (let i = 1; i < props.gridWidth; i++) {
      gridElements.push(
        <CircleSource
          rowId={rowId}
          colId={i}
          handleSourceClick={sourceClick}
          sourceColor={sourceMap.get(rowId.toString() + "|" + i.toString())}
        />
      );
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

  const sourceClick = (rowId: number, colId: number): void => {
    switch (moveCount) {
      case 1:
        // set to red
        updateMap(rowId.toString() + "|" + colId.toString(), [255, 0, 0]);
        setMoveCount(moveCount + 1);
        break;
      case 2:
        // set to green
        updateMap(rowId.toString() + "|" + colId.toString(), [0, 255, 0]);
        setMoveCount(moveCount + 1);
        break;
      case 3:
        // set to blue
        updateMap(rowId.toString() + "|" + colId.toString(), [0, 0, 255]);
        setMoveCount(moveCount + 1);
        break;

      default:
      // code block
    }
  };

  const createSquareRows = () => {
    const gridElements = [];
    for (let i = 1; i < props.gridHeight; i++) {
      gridElements.push(
        <div>
          <CircleSource
            rowId={i}
            colId={0}
            handleSourceClick={sourceClick}
            sourceColor={sourceMap.get(i.toString() + "|" + "0")}
          />
          {createGridRow(i)}
          <CircleSource
            rowId={i}
            colId={props.gridWidth}
            handleSourceClick={sourceClick}
            sourceColor={sourceMap.get(
              i.toString() + "|" + props.gridWidth.toString()
            )}
          />
        </div>
      );
    }
    return gridElements;
  };

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
