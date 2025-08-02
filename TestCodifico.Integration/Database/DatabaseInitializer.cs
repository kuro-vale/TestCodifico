using DbUp;
using DbUp.Engine;
using Microsoft.Extensions.Configuration;

namespace TestCodifico.Integration.Database;

public static class DatabaseInitializer
{
    public static void Initialize(IConfiguration configuration)
    {
        string? connectionString = configuration.GetConnectionString(DatabaseConnector.ConnectionName);
        ArgumentNullException.ThrowIfNull(connectionString);

        EnsureDatabase.For.SqlDatabase(connectionString);

        UpgradeEngine? upgrader = DeployChanges.To.SqlDatabase(connectionString)
            .WithScriptsEmbeddedInAssembly(typeof(DatabaseInitializer).Assembly)
            .Build();

        if (upgrader.IsUpgradeRequired())
        {
            upgrader.PerformUpgrade();
        }
    }

    public static void Drop(IConfiguration configuration)
    {
        string? connectionString = configuration.GetConnectionString(DatabaseConnector.ConnectionName);
        ArgumentNullException.ThrowIfNull(connectionString);

        DropDatabase.For.SqlDatabase(connectionString);
    }
}