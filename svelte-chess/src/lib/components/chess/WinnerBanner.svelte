<script lang="ts">
	import type { WinnerColour } from '$lib/board';
	export let winner: WinnerColour;
	export let resetBoard: () => void;
</script>

{#if winner}
	<div class="fixed inset-0 z-40 flex items-center justify-center bg-black/60">
		<div
			class="z-50 flex flex-col items-center space-y-6 rounded-lg bg-[#999999] p-[16px] shadow-xl"
		>
			<h2 class="text-center text-4xl font-extrabold text-white">
				{winner === 'Stalemate' ? 'Stalemate!' : `${winner} wins!`}
			</h2>

			<button
				on:click={resetBoard}
				class="rounded-lg bg-green-600 px-6 py-3 text-lg font-semibold text-white hover:bg-green-700"
			>
				Play Again
			</button>
		</div>
	</div>
{/if}
