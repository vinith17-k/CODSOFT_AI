import { cn } from "@/lib/utils";

type GameStatus = "playing" | "thinking" | "playerWin" | "aiWin" | "draw";

interface StatusDisplayProps {
  status: GameStatus;
  currentPlayer: "X" | "O";
}

const statusMessages: Record<GameStatus, string> = {
  playing: "Your Turn",
  thinking: "AI Thinking…",
  playerWin: "🎉 You Win!",
  aiWin: "AI Wins!",
  draw: "It's a Draw!",
};

export const StatusDisplay = ({ status, currentPlayer }: StatusDisplayProps) => {
  const message = status === "playing" 
    ? `Your Turn (${currentPlayer === "X" ? "✕" : "○"})`
    : statusMessages[status];

  return (
    <div
      className={cn(
        "text-xl sm:text-2xl font-semibold text-center py-3 px-6 rounded-xl transition-all duration-300",
        status === "thinking" && "status-thinking text-muted-foreground",
        status === "playing" && "text-foreground",
        status === "playerWin" && "text-success bg-success/10",
        status === "aiWin" && "text-accent bg-accent/10",
        status === "draw" && "text-muted-foreground bg-muted/30"
      )}
    >
      {message}
    </div>
  );
};
