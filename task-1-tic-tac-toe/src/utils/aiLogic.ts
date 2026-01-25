type CellValue = "X" | "O" | null;

const WINNING_LINES = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6], // Diagonals
];

const checkWinner = (board: CellValue[]): "X" | "O" | "tie" | null => {
    for (const line of WINNING_LINES) {
        const [a, b, c] = line;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }
    if (!board.includes(null)) {
        return "tie";
    }
    return null;
};

const getEmptyCells = (board: CellValue[]): number[] => {
    return board.reduce<number[]>((acc, cell, index) => {
        if (cell === null) acc.push(index);
        return acc;
    }, []);
};

const minimax = (
    board: CellValue[],
    depth: number,
    isMaximizing: boolean
): number => {
    const result = checkWinner(board);
    if (result === "O") return 10 - depth;
    if (result === "X") return depth - 10;
    if (result === "tie") return 0;

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === null) {
                board[i] = "O";
                const score = minimax(board, depth + 1, false);
                board[i] = null;
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === null) {
                board[i] = "X";
                const score = minimax(board, depth + 1, true);
                board[i] = null;
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
};

const getHardMove = (board: CellValue[]): number => {
    const emptyCells = getEmptyCells(board);

    // Optimization: if board is empty, take center
    if (emptyCells.length === 9) return 4;

    // Optimization: if only center is taken, take center
    if (emptyCells.length === 8 && board[4] === null) return 4;

    let bestScore = -Infinity;
    let bestMove = -1;

    for (const index of emptyCells) {
        board[index] = "O";
        const score = minimax(board, 0, false);
        board[index] = null;

        if (score > bestScore) {
            bestScore = score;
            bestMove = index;
        }
    }

    return bestMove;
};

const getMediumMove = (board: CellValue[]): number => {
    const emptyCells = getEmptyCells(board);

    // 50% chance to make a random move, 50% chance to make optimal move
    if (Math.random() < 0.5) {
        return emptyCells[Math.floor(Math.random() * emptyCells.length)];
    }

    return getHardMove(board);
};

const getEasyMove = (board: CellValue[]): number => {
    const emptyCells = getEmptyCells(board);
    return emptyCells[Math.floor(Math.random() * emptyCells.length)];
};

export const getAIMove = (
    board: CellValue[],
    difficulty: "easy" | "medium" | "hard"
): number => {
    const emptyCells = getEmptyCells(board);

    if (emptyCells.length === 0) return -1;

    switch (difficulty) {
        case "easy":
            return getEasyMove(board);
        case "medium":
            return getMediumMove(board);
        case "hard":
            return getHardMove(board);
        default:
            return getHardMove(board);
    }
};
