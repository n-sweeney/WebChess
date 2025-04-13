<script lang="ts">
	export let pieces: Piece[] = [];
	export let title: string = '';
	import { getPieceImagePath, type Piece } from '$lib/board';
</script>

<div class="flex flex-col items-center gap-1">
	<div class="text-sm font-bold text-white">{title}</div>
	<div class="flex flex-col-reverse items-center gap-1">
		{#each pieces as piece}
			<img src={getPieceImagePath(piece)} alt={piece} class="h-[24px] w-[24px]" />
		{/each}
	</div>
</div>
