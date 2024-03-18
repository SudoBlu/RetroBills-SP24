namespace RetroBills.Server;

using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

public class Category
{
    [Key]
    public int CategoryID { get; set; }

    [Required]
    public string CategoryName { get; set; } 

    // Navigation property for the one-to-many relationship with Transaction 
    public ICollection<Transaction> Transactions { get; set; } 
}
