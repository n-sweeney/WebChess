import type { Board, Move } from "./board";

const BASE_URL = "http://localhost:5000/api/chess/";

// TODO: error handling

export async function getBestMove(
  board: Board,
  colour: string = "Black"
): Promise<Move> {
  const res = await fetch(BASE_URL + "best-move", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ board, colour }),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(error);
  }

  return await res.json();
}

export async function getLegalMoves(
  board: Board,
  colour: string
): Promise<Move[]> {
  const response = await fetch(`${BASE_URL}legal-moves`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ board, colour }),
  });

  if (!response.ok) throw new Error(await response.text());
  return await response.json();
}
