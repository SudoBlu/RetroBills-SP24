namespace RetroBills.Server;
using Microsoft.EntityFrameworkCore;

public class RetroBillsContext : DbContext
{
    public DbSet<User> Users { get; set; }
    public DbSet<Account> Accounts { get; set; }     
    public DbSet<Transaction> Transactions { get; set; }
    public DbSet<Category> Categories { get; set; }


    public RetroBillsContext(DbContextOptions<RetroBillsContext> options) : base(options)
    {
        
    }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Define relationships based on the updated requirements

        // A User can have many Transactions, and a Transaction belongs to one User
        modelBuilder.Entity<User>()
            .HasMany(u => u.Transactions)
            .WithOne(t => t.User)
            .HasForeignKey(t => t.UserID)
            .OnDelete(DeleteBehavior.Cascade);

        // An Account can have many Transactions, and a Transaction belongs to one Account
        modelBuilder.Entity<Account>()
            .HasMany(a => a.Transactions)
            .WithOne(t => t.Account)
            .HasForeignKey(t => t.AccountID)
            .OnDelete(DeleteBehavior.Cascade);

        // Many-to-Many relationship: User_Account junction table
        modelBuilder.Entity<User_Account>()
            .HasKey(ua => new { ua.UserID, ua.AccountID });

        modelBuilder.Entity<User_Account>()
            .HasOne(ua => ua.User)
            .WithMany(u => u.User_Accounts)
            .HasForeignKey(ua => ua.UserID);

        modelBuilder.Entity<User_Account>()
            .HasOne(ua => ua.Account)
            .WithMany(a => a.User_Accounts)
            .HasForeignKey(ua => ua.AccountID);

        base.OnModelCreating(modelBuilder);
    }



}