<script lang="ts">
	import type { Move } from '$lib/board';
	import Tile from './Tile.svelte';

	export let board;
	export let legalMoves: Move[];
	export let onSelect;

	function isLegalTarget(row: number, col: number): boolean {
		return legalMoves.some(
			(m: { toRow: number; toCol: number }) => m.toRow === row && m.toCol === col
		);
	}
</script>

<div class="grid h-full w-full grid-cols-8 grid-rows-8">
	{#each board as row, rowIndex}
		{#each row as piece, colIndex}
			<Tile
				row={rowIndex}
				col={colIndex}
				{piece}
				isLegal={isLegalTarget(rowIndex, colIndex)}
				onClick={() => onSelect(rowIndex, colIndex)}
			/>
		{/each}
	{/each}
</div>
