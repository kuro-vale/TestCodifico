using System.Data.Common;
using Dapper;
using TestCodifico.Integration.Database;
using TestCodifico.Interface.Models;
using TestCodifico.Interface.Repositories;

namespace TestCodifico.Integration.Repositories;

public class ProductRepository(DatabaseConnector connector) : IProductRepository
{
    public async Task<Product[]> GetAllProducts(CancellationToken ct)
    {
        // language=sql
        const string sql =
            """
            SELECT
                productid AS ProductId,
                productname AS ProductName
            FROM Production.Products
            """;
        var command = new CommandDefinition(sql, ct);
        await using DbConnection connection = connector.GetConnection();
        var result = await connection.QueryAsync<Product>(command);
        return result.ToArray();
    }
}