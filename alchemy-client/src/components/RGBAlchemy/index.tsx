import React, { useState, useEffect } from "react";
import Square from "../BasicShapes/Square";
import ColourGrid from "../ColourGrid";
interface RGBProps {
  data: {
    userId: string;
    width: number;
    height: number;
    maxMoves: number;
    target: number[];
  };
  handlePlayAgain: (userId: string) => void;
}

function RGBAlchemy(props: RGBProps) {
  const [moveCount, setMoveCount] = useState<number>(0);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [reloadGrid, setReloadGrid] = useState<boolean>(false);
  // Reset on data change
  useEffect(() => {
    setMoveCount(0);
    setReloadGrid(true);
    setOpenDialog(false);
  }, [props.data]);

  const handleMovePlus = () => {
    setMoveCount((moveCount: number) => moveCount + 1);
  };

  useEffect(() => {
    if (props.data.maxMoves - moveCount === 0) {
      setOpenDialog(true);
    }
  }, [moveCount]);

  const popUpModal = () => {
    return (
      <dialog open={openDialog}>
        <p>You Failed! Play again?</p>
        <form method="dialog">
          <button onClick={() => props.handlePlayAgain(props.data.userId)}>
            YES
          </button>
          <button>NO</button>
        </form>
      </dialog>
    );
  };

  return (
    <div className="RGB Alchemy">
      <b>RGB Alchemy</b>
      <div>User ID:{props.data.userId}</div>
      <div>Moves left:{props.data.maxMoves - moveCount}</div>
      <div>
        Target color:
        <Square color={props.data.target} />
      </div>
      {popUpModal()}
      <ColourGrid
        gridWidth={props.data.width}
        gridHeight={props.data.height}
        targetColor={props.data.target}
        moveCount={moveCount}
        handleMoveMade={handleMovePlus}
        reload={reloadGrid}
        handleReloaded={() => setReloadGrid(false)}
      />
    </div>
  );
}

export default RGBAlchemy;
