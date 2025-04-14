import type { Board, Colour, Move } from './board';

const BASE_URL = 'http://localhost:5000/api/chess/';

// TODO: error handling
/**
 * Generates the best move (with a predefined depth) based on the provided board.
 * @param board The current board
 * @param colour The player to check for best move
 * @returns The best move for colour
 */
export async function getBestMove(board: Board, colour: Colour = 'Black'): Promise<Move> {
	const res = await fetch(BASE_URL + 'best-move', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ board, colour })
	});

	if (!res.ok) {
		const error = await res.text();
		throw new Error(error);
	}

	return await res.json();
}

/**
 * Checks all possible moves for a given colour on the provided board.
 * @param board The current board
 * @param colour The colour to check
 * @returns List of moves containing all legal moves
 */
export async function getLegalMoves(board: Board, colour: Colour): Promise<Move[]> {
	const response = await fetch(`${BASE_URL}legal-moves`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ board, colour })
	});

	if (!response.ok) throw new Error(await response.text());
	return await response.json();
}
