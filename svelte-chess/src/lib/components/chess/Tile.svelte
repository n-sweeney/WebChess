<script lang="ts">
	export let row: number;
	export let col: number;
	export let piece: Piece;
	export let isLegal: boolean = false;
	export let onClick: () => void;
	import { getPieceImagePath, type Piece } from '$lib/board';
</script>

<button
	type="button"
	class={`flex items-center justify-center rounded-none
    ${(row + col) % 2 === 0 ? 'bg-[#f0d9b5]' : 'bg-[#b58863]'}
    ${isLegal ? 'outline-3 outline-green-400' : ''}`}
	on:click={onClick}
>
	{#if piece}
		<img src={getPieceImagePath(piece)} alt={piece} class="h-3/4 w-3/4 object-contain" />
	{/if}
</button>
