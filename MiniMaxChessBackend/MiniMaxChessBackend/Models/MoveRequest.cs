namespace MiniMaxChessBackend.Models {
    public class MoveRequest {
        public List<List<string?>> Board { get; set; } = new();
        public string Colour { get; set; } = "Black";
    }

}
