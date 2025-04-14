import { getInitialBoard, applyMove, checkWinner, cloneBoard } from './board';
import type { Board, Colour, Move, Piece, Square, WinnerColour } from './board';
import { getBestMove, getLegalMoves } from './api';

export interface GameState {
	board: Board;
	selected: Square | null;
	legalMoves: Move[];
	playerColour: Colour;
	currentTurn: Colour;
	winner: WinnerColour;
	whiteTaken: Piece[];
	blackTaken: Piece[];
	history: GameStateSave | null;
	redo: GameStateSave | null;
}

type GameStateSave = {
	board: Board;
	currentTurn: Colour;
	whiteTaken: Piece[];
	blackTaken: Piece[];
};

/**
 * Generates a default gamestate to store all the game information on.
 * @returns An initial gamestate with default values
 */
export function createGameState(): GameState {
	return {
		board: getInitialBoard(),
		selected: null,
		legalMoves: [],
		playerColour: 'White',
		currentTurn: 'White',
		winner: null,
		whiteTaken: [],
		blackTaken: [],
		history: null,
		redo: null
	};
}

/**
 * Appends a taken piece to the provided gamestates respective taken pieces.
 * @param piece The piece being taken
 * @param taker The colour taking the piece
 * @param state the current gamestate
 */
export function takePiece(piece: Piece, taker: Colour, state: GameState) {
	if (taker === 'White') {
		state.whiteTaken = [...state.whiteTaken, piece];
	} else {
		state.blackTaken = [...state.blackTaken, piece];
	}
}

/**
 * Handles the square selection for the player - this focuses on validating correct pieces are selected and making moves.
 * Once the player makes their valid move, the Computer's move is triggered
 * @param row The selected row
 * @param col The selected column
 * @param state the current gamestate
 */
export async function handleSelectSquare(
	row: number,
	col: number,
	state: GameState
): Promise<void> {
	const { board, selected, playerColour, currentTurn } = state;
	const piece = board[row][col];

	if (currentTurn !== playerColour || state.winner != null) return;

	if (!selected) {
		if (!piece || piece[0] !== playerColour[0].toLowerCase()) return;

		state.selected = { row, col };

		try {
			const allMoves = await getLegalMoves(state.board, playerColour);
			state.legalMoves = allMoves.filter((m) => m.fromRow === row && m.fromCol === col);
		} catch (e) {
			alert('Failed to get legal moves.');
			state.selected = null;
		}
	} else {
		if (selected.row === row && selected.col === col) {
			state.selected = null;
			state.legalMoves = [];
			return;
		}

		const isLegal = state.legalMoves.some((m) => m.toRow === row && m.toCol === col);
		if (!isLegal) {
			state.selected = null;
			state.legalMoves = [];
			return;
		}

		const target = board[row][col];
		if (target) takePiece(target, currentTurn, state);
		state.redo = null;
		state.history = saveGameState(state);

		state.board = applyMove(state.board, {
			fromRow: selected.row,
			fromCol: selected.col,
			toRow: row,
			toCol: col
		});
		state.selected = null;
		state.legalMoves = [];
		state.currentTurn = 'Black';

		try {
			const aiMove = await getBestMove(state.board, 'Black');
			const target = state.board[aiMove.toRow][aiMove.toCol];
			if (target) takePiece(target, 'Black', state);
			state.board = applyMove(state.board, aiMove);
			state.currentTurn = 'White';
		} catch (e) {
			alert('AI move failed');
		}

		const result = checkWinner(state.board);
		if (result) {
			state.winner = result;
		}
	}
}

/**
 * Resets the provided gamestate to the default values.
 * @param state the current gamestate
 */
export function resetGameState(state: GameState) {
	state.board = getInitialBoard();
	state.selected = null;
	state.legalMoves = [];
	state.currentTurn = state.playerColour;
	state.winner = null;
	state.whiteTaken = [];
	state.blackTaken = [];
}

/**
 * Saves the important information from the game state to a save object
 * @param state the current gamestate
 * @returns A save gamestate
 */
export function saveGameState(state: GameState): GameStateSave {
	return {
		board: cloneBoard(state.board),
		currentTurn: state.currentTurn,
		whiteTaken: [...state.whiteTaken],
		blackTaken: [...state.blackTaken]
	};
}

/**
 * Loads an existing save onto a game state, used for redo
 * @param state the current gamestate
 * @param save A save gamestate
 */
export function restoreGameState(state: GameState, save: GameStateSave) {
	state.board = save.board;
	state.currentTurn = save.currentTurn;
	state.whiteTaken = save.whiteTaken;
	state.blackTaken = save.blackTaken;
}
