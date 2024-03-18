namespace RetroBills.Server;

using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public enum AccountType
    {
        Checking,
        Savings,
        CreditCard, // Add other types as needed
        // ...
    }

public class Account
{
    [Key]
    public int AccountID { get; set; }

    [Required]
    public AccountType AccountType { get; set; }

    [Required]
    [Column(TypeName = "decimal(18,2)")]
    public decimal Balance { get; set; }

    // Navigation properties for one-to-many relationship with Transaction 
    public ICollection<Transaction> Transactions { get; set; }
    
    // Navigation property for many-to-many relationship with User through User_Account
    public ICollection<User_Account> User_Accounts { get; set; }
}