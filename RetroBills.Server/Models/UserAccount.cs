using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace RetroBills.Server.Models;

public partial class UserAccount
{
    [Key]
    [Column(Order = 1)]
    public int UserId { get; set; }
    [Key]
    [Column(Order = 2)]
    public int AccountId { get; set; }

    public virtual Account Account { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
