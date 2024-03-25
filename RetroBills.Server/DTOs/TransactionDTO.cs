namespace RetroBills.Server.DTOs
{
    public class TransactionDTO
    {
        public int UserID { get; set; }
        public int AccountID { get; set; }
        public string TransactionType { get; set; } = string.Empty;
        public string CategoryName { get; set; } = string.Empty;
        public decimal Amount { get; set; }
        public string TransactionDescription { get; set; } = string.Empty;
    }
}
