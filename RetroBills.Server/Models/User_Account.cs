namespace RetroBills.Server;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
public class User_Account
{
    public int UserID { get; set; }
    public User User { get; set; }

    public int AccountID { get; set; }
    public Account Account { get; set; }
}
