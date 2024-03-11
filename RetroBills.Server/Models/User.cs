namespace RetroBills.Server;

using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

public class User
{
    [Key]
    public int UserID { get; set; }

    [Required]
    public string UserName { get; set; }

    [Required]
    public string Password { get; set; }

    [Required]
    [EmailAddress]
    public string Email { get; set; }

    [Required]
    public string FirstName { get; set; }

    [Required]
    public string LastName { get; set; }

    [Required] 
    public string Address { get; set; }

    // Navigation property for many-to-many relationship with Account through User_Account
    public ICollection<User_Account> User_Accounts { get; set; }
    
    // Navigation property for one-to-many relationship with Transaction
    public ICollection<Transaction> Transactions { get; set; }
    
}