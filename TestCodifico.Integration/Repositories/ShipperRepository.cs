using System.Data.Common;
using Dapper;
using TestCodifico.Integration.Database;
using TestCodifico.Interface.Models;
using TestCodifico.Interface.Repositories;

namespace TestCodifico.Integration.Repositories;

public class ShipperRepository(DatabaseConnector connector) : IShipperRepository
{
    public async Task<Shipper[]> GetAllShippers(CancellationToken ct)
    {
        // language=sql
        const string sql =
            """
            SELECT
                shipperid AS ShipperId,
                companyname AS CompanyName
            FROM Sales.Shippers
            """;
        var command = new CommandDefinition(sql, ct);
        await using DbConnection connection = connector.GetConnection();
        var result = await connection.QueryAsync<Shipper>(command);
        return result.ToArray();
    }
}