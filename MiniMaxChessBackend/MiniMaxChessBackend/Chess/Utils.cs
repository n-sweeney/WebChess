using Chess.Pieces;

namespace MiniMaxChessBackend.Chess {
    public static class Utils {
        public static Piece? PieceFromString(string? piece) {
            if (string.IsNullOrWhiteSpace(piece))
                return null;

            PieceColour colour = piece[0] == 'w' ? PieceColour.White : PieceColour.Black;
            char type = piece[1];

            switch (type) {
                case 'P':
                    return new Pawn(colour);

                case 'R':
                    return new Rook(colour);

                case 'N':
                    return new Knight(colour);

                case 'B':
                    return new Bishop(colour);

                case 'Q':
                    return new Queen(colour);

                case 'K':
                    return new King(colour);

                default:
                    return null;
            }
        }
    }
}
