<script lang="ts">
  import {
    getInitialBoard,
    applyMove,
    type Board,
    type Colour,
    checkWinner,
  } from "./lib/board";
  import { getBestMove, getLegalMoves } from "./lib/api";
  import Chessboard from "./components/chess/Chessboard.svelte";
  import WinnerBanner from "./components/chess/WinnerBanner.svelte";

  let board: Board = getInitialBoard();
  let selected: { row: number; col: number } | null = null;
  let legalMoves: {
    fromRow: number;
    fromCol: number;
    toRow: number;
    toCol: number;
  }[] = [];

  let playerColour: Colour = "White";
  let currentTurn: Colour = "White";
  let winner: "White" | "Black" | "Stalemate" | null = null;

  async function selectSquare(row: number, col: number) {
    const piece = board[row][col];
    if (currentTurn !== playerColour) return;

    if (!selected) {
      if (!piece || piece[0] !== playerColour[0].toLowerCase()) return;

      selected = { row, col };

      try {
        const allMoves = await getLegalMoves(board, playerColour);
        legalMoves = allMoves.filter(
          (m: { fromRow: number; fromCol: number }) =>
            m.fromRow === row && m.fromCol === col
        );
      } catch (e) {
        alert("Failed to get legal moves.");
        selected = null;
      }
    } else {
      if (selected.row === row && selected.col === col) {
        selected = null;
        legalMoves = [];
        return;
      }

      const isLegal = legalMoves.some(
        (m) => m.toRow === row && m.toCol === col
      );
      if (!isLegal) {
        selected = null;
        legalMoves = [];
        return;
      }

      board = applyMove(board, {
        fromRow: selected.row,
        fromCol: selected.col,
        toRow: row,
        toCol: col,
      });
      selected = null;
      legalMoves = [];
      currentTurn = "Black";

      try {
        const aiMove = await getBestMove(board, "Black");
        board = applyMove(board, aiMove);
        currentTurn = "White";
      } catch (e) {
        alert("AI move failed");
      }
    }
  }

  $: if (board && currentTurn && !winner) {
    const result = checkWinner(board);
    if (result) {
      winner = result;
    }
  }
</script>

<h1 class="text-4xl font-bold text-green-600">
  {currentTurn == "White" ? "Your" : "Computer's"} Turn...
</h1>
<Chessboard {board} {selected} {legalMoves} onSelect={selectSquare} />
<WinnerBanner {winner} />
