namespace RetroBills.Server;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

public class DbContextFactory : IDesignTimeDbContextFactory<RetroBillsContext>
{
    public RetroBillsContext CreateDbContext(string[] args)
    {
        var optionsBuilder = new DbContextOptionsBuilder<RetroBillsContext>();
        optionsBuilder.UseSqlServer(DatabaseConfig.ConnectionString);

        return new RetroBillsContext(optionsBuilder.Options);
    }
}