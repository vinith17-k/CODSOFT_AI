import { describe, it, expect } from 'vitest';
import { getAIMove } from '../utils/aiLogic';

type CellValue = "X" | "O" | null;

describe('AI Logic', () => {
    it('returns -1 if board is full', () => {
        const board: CellValue[] = ['X', 'O', 'X', 'O', 'X', 'O', 'X', 'O', 'X'];
        const move = getAIMove(board, 'hard');
        expect(move).toBe(-1);
    });

    it('returns center move if board is empty on hard mode', () => {
        const board: CellValue[] = Array(9).fill(null);
        const move = getAIMove(board, 'hard');
        expect(move).toBe(4);
    });

    it('blocks immediate threat', () => {
        // X X .
        // O O .
        // . . .
        const board: CellValue[] = ['X', 'X', null, 'O', 'O', null, null, null, null];
        const move = getAIMove(board, 'hard');
        // AI (O) should block X from winning, but wait...
        // If it's O's turn, O can also win. The minimax priorities:
        // 1. Win if possible
        // 2. Block if necessary

        // Let's set up a scenario where AI MUST block to survive
        // X X .
        // . O .
        // . . .
        const blockBoard: CellValue[] = ['X', 'X', null, null, 'O', null, null, null, null];
        // X is about to win at index 2
        const blockMove = getAIMove(blockBoard, 'hard');
        expect(blockMove).toBe(2);
    });

    it('takes winning move immediately', () => {
        // O O .
        // X X .
        // . . .
        const board: CellValue[] = ['O', 'O', null, 'X', 'X', null, null, null, null];
        const move = getAIMove(board, 'hard');
        expect(move).toBe(2);
    });

    it('plays valid move on easy mode', () => {
        const board: CellValue[] = Array(9).fill(null);
        const move = getAIMove(board, 'easy');
        expect(move).toBeGreaterThanOrEqual(0);
        expect(move).toBeLessThan(9);
    });
});
