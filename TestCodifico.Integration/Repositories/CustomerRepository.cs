using System.Data.Common;
using Dapper;
using TestCodifico.Integration.Database;
using TestCodifico.Interface.Models;
using TestCodifico.Interface.Repositories;

namespace TestCodifico.Integration.Repositories;

public class CustomerRepository(DatabaseConnector connector) : ICustomerRepository
{
    public async Task<CustomerPrediction[]> SaleDatePrediction(string customerName, CancellationToken ct)
    {
        // language=sql
        const string sql =
            """
            WITH DateDifferences AS (
                SELECT o.custid,
                       orderdate AS CurrentDate,
                       LAG(orderdate) OVER (PARTITION BY o.custid ORDER BY orderdate) AS PreviousDate
                FROM Sales.Orders o
            ),
                 AverageGaps AS (
                     SELECT custid,
                            AVG(COALESCE(DATEDIFF(DAY, PreviousDate, CurrentDate) * 1.0, 0)) AS AvgDays
                     FROM DateDifferences
                     GROUP BY custid
                 ),
                 LastOrder AS (
                     SELECT o.custid,
                            MAX(o.orderdate) AS LastOrderDate
                     FROM Sales.Orders o
                     GROUP BY o.custid
                 )
            SELECT c.companyname AS CustomerName,
                   LastOrderDate,
                   DATEADD(DAY, ag.AvgDays, LastOrderDate) AS NextPredictedOrder
            FROM Sales.Customers c
                     JOIN LastOrder lo ON c.custid = lo.custid
                     JOIN AverageGaps ag ON c.custid = ag.custid
            WHERE c.companyname LIKE '%' + @customerName + '%'
            """;
        var command = new CommandDefinition(sql, new { customerName }, cancellationToken: ct);
        await using DbConnection connection = connector.GetConnection();
        var result = await connection.QueryAsync<CustomerPrediction>(command);
        return result.ToArray();
    }
}