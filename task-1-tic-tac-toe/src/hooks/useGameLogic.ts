import { useState, useCallback, useEffect } from "react";
import { Difficulty } from "@/components/DifficultySelector";
import { getAIMove } from "@/utils/aiLogic";

type CellValue = "X" | "O" | null;
type GameStatus = "playing" | "thinking" | "playerWin" | "aiWin" | "draw";

const WINNING_LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6], // Diagonals
];

const checkWinner = (board: CellValue[]): { winner: CellValue; line: number[] | null } => {
  for (const line of WINNING_LINES) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line };
    }
  }
  return { winner: null, line: null };
};

const getEmptyCells = (board: CellValue[]): number[] => {
  return board.reduce<number[]>((acc, cell, index) => {
    if (cell === null) acc.push(index);
    return acc;
  }, []);
};



export const useGameLogic = () => {
  const [board, setBoard] = useState<CellValue[]>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">("X");
  const [status, setStatus] = useState<GameStatus>("playing");
  const [winningLine, setWinningLine] = useState<number[] | null>(null);
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");
  const [scores, setScores] = useState({
    playerWins: 0,
    aiWins: 0,
    draws: 0,
  });

  const restartGame = useCallback(() => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer("X");
    setStatus("playing");
    setWinningLine(null);
  }, []);

  const resetScore = useCallback(() => {
    setScores({ playerWins: 0, aiWins: 0, draws: 0 });
    restartGame();
  }, [restartGame]);

  const makeMove = useCallback((index: number) => {
    if (board[index] !== null || status !== "playing") return;

    const newBoard = [...board];
    newBoard[index] = "X";
    setBoard(newBoard);

    const { winner, line } = checkWinner(newBoard);
    if (winner) {
      setWinningLine(line);
      setStatus("playerWin");
      setScores((prev) => ({ ...prev, playerWins: prev.playerWins + 1 }));
      return;
    }

    if (getEmptyCells(newBoard).length === 0) {
      setStatus("draw");
      setScores((prev) => ({ ...prev, draws: prev.draws + 1 }));
      return;
    }

    setCurrentPlayer("O");
    setStatus("thinking");
  }, [board, status]);

  // AI move effect
  useEffect(() => {
    if (status !== "thinking") return;

    const makeAIMove = () => {
      // Get AI move using minimax algorithm
      const aiMove = getAIMove(board, difficulty);

      if (aiMove === -1) return;

      const newBoard = [...board];
      newBoard[aiMove] = "O";
      setBoard(newBoard);

      const { winner, line } = checkWinner(newBoard);
      if (winner) {
        setWinningLine(line);
        setStatus("aiWin");
        setScores((prev) => ({ ...prev, aiWins: prev.aiWins + 1 }));
        return;
      }

      if (getEmptyCells(newBoard).length === 0) {
        setStatus("draw");
        setScores((prev) => ({ ...prev, draws: prev.draws + 1 }));
        return;
      }

      setCurrentPlayer("X");
      setStatus("playing");
    };

    // Add a small delay for better UX
    const timer = setTimeout(() => {
      makeAIMove();
    }, 500);

    return () => clearTimeout(timer);
  }, [status, board, difficulty]);

  return {
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
  };
};
