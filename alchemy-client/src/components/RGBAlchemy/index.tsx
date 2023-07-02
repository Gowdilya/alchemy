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
  const [win, setWin] = useState<boolean>(false);
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
        <p>{win ? "You Win! Play again?" : "You Failed! Play again?"}</p>
        <form method="dialog">
          <button onClick={() => props.handlePlayAgain(props.data.userId)}>
            YES
          </button>
          <button>NO</button>
        </form>
      </dialog>
    );
  };

  const handleWin = () => {
    setWin(true);
    setOpenDialog(true);
  };

  return (
    <div
      className="RGB Alchemy"
      style={{ marginLeft: `20px`, marginTop: `20px` }}
    >
      <b>RGB Alchemy</b>
      <div>User ID:{props.data.userId}</div>
      <div>Moves left:{props.data.maxMoves - moveCount}</div>
      <div style={{ marginTop: `10px`, marginBottom: `10px` }}>
        Target color:
        <Square color={props.data.target} />
      </div>
      {popUpModal()}
      <ColourGrid
        gridWidth={props.data.width}
        gridHeight={props.data.height}
        targetColor={props.data.target}
        moveCount={moveCount}
        moveMade={handleMovePlus}
        reload={reloadGrid}
        reloaded={() => setReloadGrid(false)}
        win={handleWin}
      />
    </div>
  );
}

export default RGBAlchemy;
