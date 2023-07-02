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
      openDialog && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-center mb-4">
              {win ? "You Win! Play again?" : "You Failed! Play again?"}
            </p>
            <div className="flex justify-center">
              <button
                onClick={() => props.handlePlayAgain(props.data.userId)}
                className="mr-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:bg-green-600"
              >
                YES
              </button>
              <button
                onClick={() => setOpenDialog(false)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:bg-red-600"
              >
                NO
              </button>
            </div>
          </div>
        </div>
      )
    );
  };

  const handleWin = () => {
    setWin(true);
    setOpenDialog(true);
  };

  return (
    <div className="mt-6 mb-6 ml-6">
      <b>RGB Alchemy</b>
      <div className="mt-2 mb-2">User ID:{props.data.userId}</div>
      <div className="mt-2 mb-2">
        Moves left:{props.data.maxMoves - moveCount}
      </div>
      <div className="mt-2 mb-2 h-4">
        Target color:
        <div className="inline relative top-1/2 ml-2">
          <Square color={props.data.target} />
        </div>
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
