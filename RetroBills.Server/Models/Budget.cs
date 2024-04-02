namespace RetroBills.Server.Models
{
    public partial class Budget
    {
        public int BudgetId { get; set; }
        public int AccountId { get; set; }
        public decimal BudgetAmount { get; set; }
        public virtual Account Account { get; set; } = null!;
    }
}
