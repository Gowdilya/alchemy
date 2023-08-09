import SquareTile from "./SquareTile";
import CircleSource from "./CircleSource";
import { useState, useEffect } from "react";
import Square from "../BasicShapes/Square";

interface GridProps {
  gridHeight: number;
  gridWidth: number;
  targetColor: number[];
  moveCount: number;
  reload: boolean;
  moveMade: () => void;
  reloaded: () => void;
  win: () => void;
}

const DELTA_CONST = (1 / 255) * (1 / Math.sqrt(3));
interface GridCoordinates {
  rowId: number;
  colId: number;
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
  const [sourceMap, setSourceMap] = useState<Map<string, number[]>>(new Map());
  const [tileMap, setTileMap] = useState<Map<string, number[]>>(new Map());
  const [closestIndex, setClosestIndex] = useState<GridCoordinates>({
    rowId: 1,
    colId: 1,
  });

  // Reset when reload is true
  useEffect(() => {
    setSourceMap(new Map());
    setTileMap(new Map());
    setClosestIndex({ rowId: 1, colId: 1 });
    setDelta(calculateDelta(props.targetColor, COLOR.DEFAULT_BLACK));
    props.reloaded();
  }, [props.reload, props.targetColor]);

  const allowTileDrop = props.moveCount > 2;
  const sourceClickable = props.moveCount < 2;

  const calculateDelta = (target: number[], obtained: number[]) => {
    return (
      DELTA_CONST *
      Math.sqrt(
        (target[0] - obtained[0]) ** 2 +
          (target[1] - obtained[1]) ** 2 +
          (target[2] - obtained[2]) ** 2
      )
    );
  };

  const [delta, setDelta] = useState<number>(
    calculateDelta(props.targetColor, COLOR.DEFAULT_BLACK)
  );

  const convertedDelta = () => {
    return (delta * 100).toFixed(2);
  };

  /* 
  updateFunctions trigger a rerender, new Map must be created so the pointer changes
  could also use immutable.js(library) instead? 
  */
  const updateSourceMap = (k: string, v: number[]) => {
    setSourceMap(new Map(sourceMap.set(k, v)));
  };

  const updateTileMap = (k: string, v: number[]) => {
    setTileMap(new Map(tileMap.set(k, v)));
  };

  const verifyClosest = (tileColor: number[], rowId: number, colId: number) => {
    if (rowId === closestIndex.rowId && colId === closestIndex.colId) {
      return;
    }
    const newDelta = calculateDelta(props.targetColor, tileColor);
    let closestColor = getTileColor(closestIndex.rowId, closestIndex.colId);
    if (closestColor) {
      const oldDelta = calculateDelta(props.targetColor, closestColor);
      if (newDelta < oldDelta) {
        setClosestIndex({ rowId: rowId, colId: colId });
        setDelta(newDelta);
      }
    }
  };

  //Set Win Condition
  useEffect(() => {
    if (delta < 0.1) {
      props.win();
    }
  }, [delta]);

  const createTileRow = (rowId: number) => {
    const gridElements = [];
    for (let i = 1; i < props.gridWidth; i++) {
      gridElements.push(
        <SquareTile
          key={"tile-" + rowId + "-" + i}
          rowId={rowId}
          colId={i}
          color={getTileColor(rowId, i)}
          isDraggable={allowTileDrop}
          isClosest={closestIndex.rowId === rowId && closestIndex.colId === i}
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
    updateSourceMap(mapKey, color);
    updateSourceShinedTiles(rowId, colId);
  };

  const getSourceColor = (rowId: number, colId: number) => {
    let mapKey = getKey(rowId, colId);
    return sourceMap.get(mapKey) ? sourceMap.get(mapKey) : COLOR.DEFAULT_BLACK;
  };

  const getTileColor = (rowId: number, colId: number) => {
    let mapKey = getKey(rowId, colId);
    return tileMap.get(mapKey) ? tileMap.get(mapKey) : COLOR.DEFAULT_BLACK;
  };
  /* set Tile color based on all of it's shined sources */
  const setTileColor = (rowId: number, colId: number) => {
    let shineColors = [];
    let newColor: number[] = [0, 0, 0];
    let shineColor;
    // Array of all the sources that effect this tile
    let shinedSource = [];
    // had to modify tsconfig to target es6 to Iterate through keys
    for (let key of sourceMap.keys()) {
      let ids = key.split("|");
      let sourceRow = parseInt(ids[0]);
      let sourceCol = parseInt(ids[1]);

      if (sourceRow === rowId || sourceCol === colId) {
        shinedSource.push({ rowId: sourceRow, colId: sourceCol });
      }
    }
    if (shinedSource.length === 0) {
      return COLOR.DEFAULT_BLACK;
    }
    for (let source of shinedSource) {
      shineColor = COLOR.DEFAULT_BLACK;
      let ratio;
      let distance;
      if (source.rowId === rowId) {
        distance = Math.abs(source.colId - colId);
        ratio = (props.gridWidth - distance + 1) / (props.gridWidth + 1);
      } else {
        // (source.colId == colId)
        distance = Math.abs(source.rowId - rowId);
        ratio = (props.gridHeight - distance + 1) / (props.gridHeight + 1);
      }
      let sourceColor = getSourceColor(source.rowId, source.colId);
      if (sourceColor) {
        shineColor = [
          sourceColor[0] * ratio,
          sourceColor[1] * ratio,
          sourceColor[2] * ratio,
        ];
        shineColors.push(shineColor);
      }
    }
    for (let i = 0; i < shineColors.length; i++) {
      newColor[0] += shineColors[i][0];
      newColor[1] += shineColors[i][1];
      newColor[2] += shineColors[i][2];
    }
    return newColor;
  };

  const updateSourceShinedTiles = (
    sourceRowId: number,
    sourceColId: number
  ) => {
    let newColor: number[];
    let mapKey: string;
    if (sourceRowId === 0 || sourceRowId === props.gridHeight) {
      for (let i = 1; i < props.gridHeight; i++) {
        newColor = setTileColor(i, sourceColId);
        mapKey = getKey(i, sourceColId);
        updateTileMap(mapKey, newColor);
        verifyClosest(newColor, i, sourceColId);
      }
    } else {
      for (let i = 1; i < props.gridWidth; i++) {
        newColor = setTileColor(sourceRowId, i);
        mapKey = getKey(sourceRowId, i);
        updateTileMap(mapKey, newColor);
        verifyClosest(newColor, sourceRowId, i);
      }
    }
  };

  const sourceClick = (rowId: number, colId: number): void => {
    switch (props.moveCount) {
      case 0:
        // set to red
        fillSource(rowId, colId, COLOR.RED);
        props.moveMade();
        break;
      case 1:
        // set to green
        fillSource(rowId, colId, COLOR.GREEN);
        props.moveMade();
        break;
      case 2:
        // set to blue
        fillSource(rowId, colId, COLOR.BLUE);
        props.moveMade();
        break;

      default:
      // code block
      // props.handleMoveMade();
    }
  };

  const sourceDrop = (color: number[], rowId: number, colId: number) => {
    fillSource(rowId, colId, color);
    props.moveMade();
  };

  const createSourceRow = (rowId: number) => {
    const gridElements = [];
    for (let i = 1; i < props.gridWidth; i++) {
      gridElements.push(
        <CircleSource
          key={"source" + rowId + "-" + i}
          rowId={rowId}
          colId={i}
          handleSourceClick={sourceClick}
          color={getSourceColor(rowId, i)}
          handleSourceDrop={sourceDrop}
          isClickable={sourceClickable}
        />
      );
    }
    return <div>{gridElements}</div>;
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
            color={getSourceColor(i, 0)}
            handleSourceDrop={sourceDrop}
            isClickable={sourceClickable}
          />
          {createTileRow(i)}
          <CircleSource
            rowId={i}
            colId={props.gridWidth}
            handleSourceClick={sourceClick}
            color={getSourceColor(i, props.gridWidth)}
            handleSourceDrop={sourceDrop}
            isClickable={sourceClickable}
          />
        </div>
      );
    }
    return gridElements;
  };

  /** Note the top and bottom row only has circles Tiles, so we use the createCirclesHorizontal, first and last  */
  return (
    <div className="mt-6">
      <div className="mb-6 h-4">
        Closest color:
        <div className="inline relative top-1/2 ml-2">
          <Square
            color={getTileColor(closestIndex.rowId, closestIndex.colId)}
          />
        </div>
        {"Δ=" + convertedDelta() + "%"}
      </div>
      <div className="overflow-auto whitespace-nowrap text-center">
        {createSourceRow(0)}
        {createSourceTileRows()}
        {createSourceRow(props.gridHeight)}
      </div>
    </div>
  );
}

export default ColourGrid;
