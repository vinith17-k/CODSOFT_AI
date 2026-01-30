import { cn } from "@/lib/utils";

type CellValue = "X" | "O" | null;

interface GameCellProps {
  value: CellValue;
  onClick: () => void;
  disabled: boolean;
  isWinning: boolean;
}

export const GameCell = ({ value, onClick, disabled, isWinning }: GameCellProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "game-cell aspect-square w-full flex items-center justify-center",
        "text-5xl sm:text-6xl md:text-7xl font-bold",
        "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background",
        disabled && "disabled",
        isWinning && "winning-cell"
      )}
      aria-label={value ? `Cell contains ${value}` : "Empty cell"}
      data-testid="game-cell"
    >
      {value && (
        <span
          className={cn(
            "animate-symbol",
            value === "X" ? "symbol-x" : "symbol-o"
          )}
        >
          {value === "X" ? "✕" : "○"}
        </span>
      )}
    </button>
  );
};
