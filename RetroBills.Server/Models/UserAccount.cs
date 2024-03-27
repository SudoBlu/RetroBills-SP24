using System;
using System.Collections.Generic;

namespace RetroBills.Server.Models;

public partial class UserAccount
{
    public int UserId { get; set; }

    public int AccountId { get; set; }

    public virtual Account Account { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
