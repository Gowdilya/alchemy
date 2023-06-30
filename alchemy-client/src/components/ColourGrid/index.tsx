import SquareTile from "./SquareTile";
import CircleSource from "./CircleSource";
import { useState, MouseEvent } from "react";
interface GridProps {
  gridHeight: number;
  gridWidth: number;
}

const COLOR = {
  RED: [255, 0, 0],
  GREEN: [0, 255, 0],
  BLUE: [0, 0, 255],
  DEFAULT_BLACK: [0, 0, 0],
};
Object.freeze(COLOR); //Prevent override of Keys

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
  const createSourceRow = (rowId: number) => {
    const gridElements = [];
    for (let i = 1; i < props.gridWidth; i++) {
      gridElements.push(
        <CircleSource
          rowId={rowId}
          colId={i}
          handleSourceClick={sourceClick}
          sourceColor={getSourceColor(rowId, i)}
        />
      );
    }
    return gridElements;
  };
  const createTileRow = (rowId: number) => {
    const gridElements = [];
    for (let i = 1; i < props.gridWidth; i++) {
      gridElements.push(
        <SquareTile
          rowId={rowId}
          colId={i}
          tileColor={getTileColor(rowId, i)}
        />
      );
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

  const getSourceColor = (rowId: number, colId: number) => {
    let mapKey = getKey(rowId, colId);
    return sourceMap.get(mapKey) ? sourceMap.get(mapKey) : COLOR.DEFAULT_BLACK;
  };

  const getTileColor = (rowId: number, colId: number) => {
    console.log(sourceMap.keys());
    let sourceKeys = sourceMap.keys();
    for (let key of sourceMap.keys()) {
      console.log(key);
    }

    return [0, 255, 255];
  };

  const sourceClick = (rowId: number, colId: number): void => {
    switch (moveCount) {
      case 1:
        // set to red
        fillSource(rowId, colId, COLOR.RED);
        setMoveCount(moveCount + 1);
        break;
      case 2:
        // set to green
        fillSource(rowId, colId, COLOR.GREEN);
        setMoveCount(moveCount + 1);
        break;
      case 3:
        // set to blue
        fillSource(rowId, colId, COLOR.BLUE);
        setMoveCount(moveCount + 1);
        break;

      default:
      // code block
    }
  };

  const createSourceTileRows = () => {
    const gridElements = [];
    for (let i = 1; i < props.gridHeight; i++) {
      gridElements.push(
        <div>
          <CircleSource
            rowId={i}
            colId={0}
            handleSourceClick={sourceClick}
            sourceColor={getSourceColor(i, 0)}
          />
          {createTileRow(i)}
          <CircleSource
            rowId={i}
            colId={props.gridWidth}
            handleSourceClick={sourceClick}
            sourceColor={getSourceColor(i, props.gridWidth)}
          />
        </div>
      );
    }
    return gridElements;
  };

  /** Note the top and bottom row only has circles Tiles, so we use the createCirclesHorizontal, first and last  */
  return (
    <div>
      <div>{createSourceRow(0)}</div>
      {createSourceTileRows()}
      <div>{createSourceRow(props.gridHeight)}</div>
    </div>
  );
}

export default ColourGrid;
