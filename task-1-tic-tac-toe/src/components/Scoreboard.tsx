interface ScoreboardProps {
  playerWins: number;
  aiWins: number;
  draws: number;
}

export const Scoreboard = ({ playerWins, aiWins, draws }: ScoreboardProps) => {
  return (
    <div className="flex justify-center gap-4 sm:gap-8">
      <div className="text-center">
        <div className="text-2xl sm:text-3xl font-bold symbol-x">✕</div>
        <div className="text-xs sm:text-sm text-muted-foreground uppercase tracking-wider mt-1">You</div>
        <div className="text-xl sm:text-2xl font-bold text-foreground">{playerWins}</div>
      </div>
      
      <div className="text-center">
        <div className="text-2xl sm:text-3xl font-bold text-muted-foreground">—</div>
        <div className="text-xs sm:text-sm text-muted-foreground uppercase tracking-wider mt-1">Draws</div>
        <div className="text-xl sm:text-2xl font-bold text-foreground">{draws}</div>
      </div>
      
      <div className="text-center">
        <div className="text-2xl sm:text-3xl font-bold symbol-o">○</div>
        <div className="text-xs sm:text-sm text-muted-foreground uppercase tracking-wider mt-1">AI</div>
        <div className="text-xl sm:text-2xl font-bold text-foreground">{aiWins}</div>
      </div>
    </div>
  );
};
