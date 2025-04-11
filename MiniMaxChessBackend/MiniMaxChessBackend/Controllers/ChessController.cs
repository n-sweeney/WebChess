using Chess;
using Chess.Pieces;
using Microsoft.AspNetCore.Mvc;
using MiniMaxChessBackend.Chess;
using MiniMaxChessBackend.Models;

namespace YourNamespace.Controllers {
    [ApiController]
    [Route("api/[controller]")]
    public class ChessController : ControllerBase {
        [HttpPost("best-move")]
        public ActionResult<MoveResponse> GetBestMove([FromBody] MoveRequest request) {
            var game = new Game();
            LoadBoardFromRequest(request.Board, game.Board);

            var aiColour = request.Colour == "White" ? PieceColour.White : PieceColour.Black;
            var move = game.GetBestMove(aiColour);

            if (move == null)
                return NotFound("No valid move found");

            return new MoveResponse {
                FromRow = move.FromRow,
                FromCol = move.FromCol,
                ToRow = move.ToRow,
                ToCol = move.ToCol
            };
        }

        [HttpPost("legal-moves")]
        public ActionResult<List<MoveResponse>> GetLegalMoves([FromBody] MoveRequest request) {
            var game = new Game();
            LoadBoardFromRequest(request.Board, game.Board);

            var colour = request.Colour == "White" ? PieceColour.White : PieceColour.Black;

            var legalMoves = game.Board.GenerateAllMoves(colour).Select(move => new MoveResponse {
                FromRow = move.FromRow,
                FromCol = move.FromCol,
                ToRow = move.ToRow,
                ToCol = move.ToCol
            }).ToList();

            return legalMoves;
        }

        private void LoadBoardFromRequest(List<List<string?>> boardData, Board board) {
            for (int i = 0; i < Board.BOARDSIZE; i++) {
                for (int j = 0; j < Board.BOARDSIZE; j++) {
                    var val = boardData[i][j];
                    board.Tiles[i, j] = Utils.PieceFromString(val);
                }
            }
        }
    }
}
