// Types and Constants

// Valid black pieces
export type BlackPiece = 'wR' | 'wN' | 'wQ' | 'wK' | 'wB' | 'wP';

// Valid white pieces
export type WhitePiece = 'bR' | 'bN' | 'bQ' | 'bK' | 'bB' | 'bP';

// Valid board values
export type Piece = BlackPiece | WhitePiece | null;

// Valid colours
export type Colour = 'Black' | 'White';

// Valid winning outcomes
export type WinnerColour = Colour | 'Stalemate' | null;

export type Board = Piece[][];

export type Move = {
	fromRow: number;
	fromCol: number;
	toRow: number;
	toCol: number;
};

export type Square = {
	row: number;
	col: number;
};

export const TypeMap: Record<string, string> = {
	P: 'Pawn',
	R: 'Rook',
	N: 'Knight',
	B: 'Bishop',
	Q: 'Queen',
	K: 'King'
};

// Functions

/**
 * Initialises the starting board
 * @returns A new board with the default setup
 */
export function getInitialBoard(): Board {
	return [
		['bR', 'bN', 'bB', 'bQ', 'bK', 'bB', 'bN', 'bR'],
		['bP', 'bP', 'bP', 'bP', 'bP', 'bP', 'bP', 'bP'],
		[null, null, null, null, null, null, null, null],
		[null, null, null, null, null, null, null, null],
		[null, null, null, null, null, null, null, null],
		[null, null, null, null, null, null, null, null],
		['wP', 'wP', 'wP', 'wP', 'wP', 'wP', 'wP', 'wP'],
		['wR', 'wN', 'wB', 'wQ', 'wK', 'wB', 'wN', 'wR']
	];
}

/**
 * Duplicates the contents from a board to a new object without references.
 * @param board The current board
 * @returns A new board object identical to board's contents
 */
export function cloneBoard(board: Board): Board {
	return board.map((row) => [...row]);
}

/**
 * Applies a move to the board and returns the new board state.
 * @param board The current board
 * @param move The move to apply
 * @returns A new board with the move applied
 */
export function applyMove(board: Board, move: Move): Board {
	const newBoard = cloneBoard(board);
	const piece = board[move.fromRow][move.fromCol];
	newBoard[move.toRow][move.toCol] = piece;
	newBoard[move.fromRow][move.fromCol] = null;
	return newBoard;
}

/**
 * Calculates a piece's image path.
 * @param piece The piece's board code
 * @returns The image src directory
 */
export function getPieceImagePath(piece: Piece): string {
	if (piece == null) {
		return '';
	}
	const colour = (piece[0] ?? '') === 'w' ? 'White' : 'Black';
	const type = TypeMap[piece[1]];
	return `/assets/Pieces/${colour}/${type}.png`;
}

/**
 * Checks the provided board for the lack of a king of each colour
 * @param board The current board.
 * @returns A winning state, either a colour, a draw or null
 */
export function checkWinner(board: Board): WinnerColour {
	// TODO: Add Stalemate logic
	let whiteKing = false;
	let blackKing = false;

	for (const row of board) {
		for (const piece of row) {
			if (piece === 'wK') whiteKing = true;
			if (piece === 'bK') blackKing = true;
		}
	}

	if (!whiteKing) return 'Black';
	if (!blackKing) return 'White';

	return null;
}
