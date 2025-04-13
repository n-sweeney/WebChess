<script lang="ts">
	import type { WinnerColour } from '$lib/board';
	import Clock from '../Clock.svelte';

	export let winner: WinnerColour = null;
	export let onRestart: () => void;
	export let onUndo: () => void;
	export let onRedo: () => void;
	export let undoEnabled = false;
	export let redoEnabled = false;

	let reset = false;

	function handleRestart() {
		reset = true;
		onRestart();
	}
</script>

<div class="grid w-full grid-cols-2">
	<div class="flex">
		<Clock bind:reset paused={winner == null ? false : true} />
	</div>
	<div class="flex items-center justify-end space-x-3 pr-4">
		<button
			on:click={handleRestart}
			class="flex aspect-square h-2/3 items-center justify-center rounded-md bg-gray-200"
		>
			<img src="/assets/UI/Restart.svg" alt="Restart" class="h-3/4 w-3/4 object-contain" />
		</button>
		<button
			on:click={onUndo}
			disabled={!undoEnabled}
			class="flex aspect-square h-2/3 items-center justify-center rounded-md bg-gray-200 disabled:cursor-not-allowed disabled:opacity-40"
		>
			<img src="/assets/UI/Undo.svg" alt="Undo" class="h-3/4 w-3/4 object-contain" />
		</button>
		<button
			on:click={onRedo}
			disabled={!redoEnabled}
			class="flex aspect-square h-2/3 items-center justify-center rounded-md bg-gray-200 disabled:cursor-not-allowed disabled:opacity-40"
		>
			<img src="/assets/UI/Redo.svg" alt="Redo" class="h-3/4 w-3/4 object-contain" />
		</button>
	</div>
</div>
