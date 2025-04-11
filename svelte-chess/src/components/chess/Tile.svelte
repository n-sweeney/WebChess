<script lang="ts">
  export let row: number;
  export let col: number;
  export let piece: string | null;
  export let isSelected: boolean = false;
  export let isLegal: boolean = false;
  export let onClick: () => void;
  import { getPieceImagePath } from "../../lib/board";
</script>

<button
  type="button"
  class={`w-[60px] h-[60px] flex items-center justify-center box-border rounded-none
    ${(row + col) % 2 === 0 ? "bg-[#f0d9b5]" : "bg-[#b58863]"}
    ${isSelected ? "outline outline-4 outline-red-500" : ""}
    ${isLegal ? "outline outline-4 outline-green-400" : ""}
  `}
  on:click={onClick}
>
  {#if piece}
    <img
      src={getPieceImagePath(piece)}
      alt={piece}
      class="w-[40px] h-[40px] object-contain"
    />
  {/if}
</button>
