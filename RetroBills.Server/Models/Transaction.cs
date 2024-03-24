using System;
using System.Collections.Generic;

namespace RetroBills.Server.Models;

public partial class Transaction
{
    public int TransactionId { get; set; }

    public int UserId { get; set; }

    public int AccountId { get; set; }

    public string TransactionType { get; set; } = null!;

    public string CategoryName { get; set; } = null!;

    public decimal Amount { get; set; }

    public DateTime TransactionDateTime { get; set; }

    public string? TransactionDescription { get; set; }

    public virtual Account Account { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
