using System.Data.Common;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;

namespace TestCodifico.Integration.Database;

public class DatabaseConnector(IConfiguration configuration)
{
    public const string ConnectionName = "SqlServer";
    public DbConnection GetConnection() => new SqlConnection(configuration.GetConnectionString(ConnectionName));
}