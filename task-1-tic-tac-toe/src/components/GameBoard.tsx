import { GameCell } from "./GameCell";

type CellValue = "X" | "O" | null;

interface GameBoardProps {
  board: CellValue[];
  onCellClick: (index: number) => void;
  disabled: boolean;
  winningLine: number[] | null;
}

export const GameBoard = ({ board, onCellClick, disabled, winningLine }: GameBoardProps) => {
  return (
    <div className="grid grid-cols-3 gap-3 sm:gap-4 p-4 sm:p-6 bg-secondary/30 rounded-2xl">
      {board.map((cell, index) => (
        <GameCell
          key={index}
          value={cell}
          onClick={() => onCellClick(index)}
          disabled={disabled || cell !== null}
          isWinning={winningLine?.includes(index) || false}
        />
      ))}
    </div>
  );
};
