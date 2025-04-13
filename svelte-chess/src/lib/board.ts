// Types and Constants

export type BlackPiece = 'wR' | 'wN' | 'wQ' | 'wK' | 'wB' | 'wP';

export type WhitePiece = 'bR' | 'bN' | 'bQ' | 'bK' | 'bB' | 'bP';

export type Piece = BlackPiece | WhitePiece | null;

export type Colour = 'Black' | 'White';

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

export function cloneBoard(board: Board): Board {
	return board.map((row) => [...row]);
}

export function applyMove(board: Board, move: Move): Board {
	const newBoard = cloneBoard(board);
	const piece = board[move.fromRow][move.fromCol];
	newBoard[move.toRow][move.toCol] = piece;
	newBoard[move.fromRow][move.fromCol] = null;
	return newBoard;
}

export function getPieceImagePath(code: Piece): string {
	if (code == null) {
		return '';
	}
	const colour = (code[0] ?? '') === 'w' ? 'White' : 'Black';
	const type = TypeMap[code[1]];
	return `/assets/Pieces/${colour}/${type}.png`;
}

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
