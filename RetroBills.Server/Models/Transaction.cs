namespace RetroBills.Server;

using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public enum TransactionType
{
    Income,
    Expense
}

public class Transaction
{
    [Key]
    public int TransactionID { get; set; }
    
    [ForeignKey("User")]
    public int UserID { get; set; }

    [ForeignKey("Account")]
    public int AccountID { get; set; }

    [Required]
    public TransactionType TransactionType { get; set; }

    [ForeignKey("Category")]
    // The '?' indicates it's now nullable 
    public int? CategoryID { get; set; } 

    public string CategoryName { get; set; }

    [Required]
    [Column(TypeName = "decimal(18,2)")]
    public decimal Amount { get; set; }

    [Required]
    public DateTime TransactionDateTime { get; set; }

    public string TransactionDescription { get; set; }

    // Navigation properties
    public User User { get; set; }
    public Account Account { get; set; }
}