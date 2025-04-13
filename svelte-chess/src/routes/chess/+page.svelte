<script lang="ts">
	import Chessboard from '$lib/components/chess/Chessboard.svelte';
	import WinnerBanner from '$lib/components/chess/WinnerBanner.svelte';
	import TakenPieces from '$lib/components/chess/TakenPieces.svelte';

	import {
		createGameState,
		handleSelectSquare,
		resetGameState,
		restoreGameState,
		saveGameState
	} from '$lib/ChessController';
	import InformationBar from '$lib/components/chess/InformationBar.svelte';

	let game = createGameState();

	async function selectSquare(row: number, col: number) {
		await handleSelectSquare(row, col, game);
		game = { ...game };
	}

	function resetBoard() {
		resetGameState(game);
		game = { ...game };
	}

	function undoMove() {
		if (game.history) {
			game.redo = saveGameState(game);
			restoreGameState(game, game.history);
			game.history = null;
		}
	}

	function redoMove() {
		if (game.redo) {
			game.history = saveGameState(game);
			restoreGameState(game, game.redo);
			game.redo = null;
		}
	}
</script>

<h1 class="flex items-center justify-center pt-20 pb-5 text-4xl font-bold">
	{game.currentTurn == 'White' ? 'Your' : "Computer's"} Turn...
</h1>

<div class="flex h-full items-center justify-center">
	<div class="flex w-1/3 items-center rounded-3xl bg-[#44382a] px-4 pb-8 shadow-2xl">
		<div class="m-2 flex min-w-6 flex-col items-center justify-end">
			<TakenPieces pieces={game.whiteTaken} />
		</div>

		<div class="flex aspect-square flex-1 flex-col items-center justify-between">
			<InformationBar
				winner={game.winner}
				onRestart={resetBoard}
				onUndo={undoMove}
				onRedo={redoMove}
				undoEnabled={game.history != null}
				redoEnabled={game.redo != null}
			/>
			<div class="w-full flex-1">
				<Chessboard board={game.board} legalMoves={game.legalMoves} onSelect={selectSquare} />
			</div>
			<WinnerBanner winner={game.winner} {resetBoard} />
		</div>

		<div class="m-2 flex min-w-6 flex-col items-center justify-start">
			<TakenPieces pieces={game.blackTaken} />
		</div>
	</div>
</div>
