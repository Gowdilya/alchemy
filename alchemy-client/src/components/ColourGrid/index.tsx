import GridSquare from "./SquareTile";
import CircleSource from "./CircleSource";
import { useState, MouseEvent } from "react";
interface GridProps {
  gridHeight: number;
  gridWidth: number;
}

const COLOUR = {
  RED: [255, 0, 0],
  GREEN: [0, 255, 0],
  BLUE: [0, 0, 255],
};
Object.freeze(COLOUR); //Prevent override of Keys

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
          sourceColor={getSourceColour(rowId, i)}
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

  const getKey = (rowId: number, colId: number) => {
    return rowId.toString() + "|" + colId.toString();
  };

  // update Map of corresponding source, with  color
  const fillSource = (rowId: number, colId: number, color: number[]) => {
    let mapKey = getKey(rowId, colId);
    updateMap(mapKey, color);
  };

  const getSourceColour = (rowId: number, colId: number) => {
    let mapKey = getKey(rowId, colId);
    return sourceMap.get(mapKey);
  };

  const sourceClick = (rowId: number, colId: number): void => {
    switch (moveCount) {
      case 1:
        // set to red
        fillSource(rowId, colId, COLOUR.RED);
        setMoveCount(moveCount + 1);
        break;
      case 2:
        // set to green
        fillSource(rowId, colId, COLOUR.GREEN);
        setMoveCount(moveCount + 1);
        break;
      case 3:
        // set to blue
        fillSource(rowId, colId, COLOUR.BLUE);
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
            sourceColor={getSourceColour(i, 0)}
          />
          {createGridRow(i)}
          <CircleSource
            rowId={i}
            colId={props.gridWidth}
            handleSourceClick={sourceClick}
            sourceColor={getSourceColour(i, props.gridWidth)}
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
