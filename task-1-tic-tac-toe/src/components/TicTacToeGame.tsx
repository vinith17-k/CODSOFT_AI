import { GameBoard } from "./GameBoard";
import { StatusDisplay } from "./StatusDisplay";
import { Scoreboard } from "./Scoreboard";
import { GameControls } from "./GameControls";
import { DifficultySelector } from "./DifficultySelector";
import { useGameLogic } from "@/hooks/useGameLogic";
import { Sparkles } from "lucide-react";

export const TicTacToeGame = () => {
  const {
    board,
    currentPlayer,
    status,
    winningLine,
    difficulty,
    scores,
    makeMove,
    restartGame,
    resetScore,
    setDifficulty,
  } = useGameLogic();

  const isGameOver = status === "playerWin" || status === "aiWin" || status === "draw";

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6">
      <div className="game-card w-full max-w-md p-6 sm:p-8 space-y-6 sm:space-y-8">
        {/* Title */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="w-6 h-6 text-primary" />
            <h1 className="text-3xl sm:text-4xl font-display font-bold text-gradient">
              Tic-Tac-Toe AI
            </h1>
            <Sparkles className="w-6 h-6 text-accent" />
          </div>
          <p className="text-sm text-muted-foreground">
            Challenge the AI and test your skills
          </p>
        </div>

        {/* Difficulty Selector */}
        <DifficultySelector
          difficulty={difficulty}
          onDifficultyChange={setDifficulty}
        />

        {/* Status Display */}
        <StatusDisplay status={status} currentPlayer={currentPlayer} />

        {/* Game Board */}
        <GameBoard
          board={board}
          onCellClick={makeMove}
          disabled={status === "thinking" || isGameOver}
          winningLine={winningLine}
        />

        {/* Scoreboard */}
        <Scoreboard
          playerWins={scores.playerWins}
          aiWins={scores.aiWins}
          draws={scores.draws}
        />

        {/* Controls */}
        <GameControls onRestart={restartGame} onResetScore={resetScore} />
      </div>
    </div>
  );
};
