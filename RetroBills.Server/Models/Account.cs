using System;
using System.Collections.Generic;

namespace RetroBills.Server.Models;

public partial class Account
{
    public int AccountId { get; set; }

    public string AccountType { get; set; } = null!;

    public decimal Balance { get; set; }

    public virtual ICollection<Transaction> Transactions { get; set; } = new List<Transaction>();
}
