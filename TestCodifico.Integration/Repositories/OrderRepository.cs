using System.Data.Common;
using System.Text.Json;
using Dapper;
using Microsoft.Extensions.Logging;
using TestCodifico.Integration.Database;
using TestCodifico.Interface.Models;
using TestCodifico.Interface.Repositories;

namespace TestCodifico.Integration.Repositories;

public class OrderRepository(DatabaseConnector connector, ILogger<OrderRepository> logger) : IOrderRepository
{
    public async Task<ClientOrder[]> GetClientOrders(string clientName, CancellationToken ct)
    {
        // language=sql
        const string sql =
            """
            SELECT
                orderid AS OrderId,
                requireddate AS RequiredDate,
                shippeddate AS ShippedDate,
                shipname AS ShipName,
                shipaddress AS ShipAddress,
                shipcity AS ShipCity
            FROM Sales.Orders o
            JOIN Sales.Customers c on c.custid = o.custid
            WHERE c.companyname = @clientName
            """;
        var command = new CommandDefinition(sql, new { clientName }, cancellationToken: ct);
        await using DbConnection connection = connector.GetConnection();
        var result = await connection.QueryAsync<ClientOrder>(command);
        return result.ToArray();
    }

    public async Task<bool> AddNewOrder(string clientName, Order order, CancellationToken ct)
    {
        await using DbConnection connection = connector.GetConnection();
        await connection.OpenAsync(ct);
        await using DbTransaction transaction = await connection.BeginTransactionAsync(ct);
        try
        {
            // language=sql
            var sql =
                """
                SELECT custid
                FROM Sales.Customers
                WHERE companyname = @clientName
                """;
            var command = new CommandDefinition(sql, new { clientName }, transaction, cancellationToken: ct);
            var customerId = await connection.QueryFirstAsync<int>(command);
            // language=sql
            sql =
                """
                -- noinspection SqlResolve
                INSERT INTO Sales.Orders
                (custid, empid, shipperid, shipname, shipaddress, shipcity, orderdate, requireddate, shippeddate, freight, shipcountry)
                OUTPUT INSERTED.orderid
                VALUES (@CustomerId, @EmployeeId, @ShipperId, @ShipName, @ShipAddress, @ShipCity, @OrderDate, @RequiredDate, @ShippedDate, @Freight, @ShipCountry)
                """;
            // Insert order
            var newId = await connection.ExecuteScalarAsync<int>(sql, order with { CustomerId = customerId },
                transaction);

            // language=sql
            sql =
                """
                -- noinspection SqlResolve
                INSERT INTO Sales.OrderDetails
                (orderid, productid, unitprice, qty, discount)
                VALUES (@OrderId, @ProductId, @UnitPrice, @Qty, @Discount)
                """;
            // Insert order detail
            await connection.ExecuteAsync(sql, order.Details with { OrderId = newId }, transaction);

            await transaction.CommitAsync(ct);
            logger.LogInformation("Inserted new Order for Customer {CustId}", order.CustomerId);
            return true;
        }
        catch (Exception e)
        {
            await transaction.RollbackAsync(ct);
            await connection.CloseAsync();
            logger.LogError(e, "Failed to insert new Order Request: {Order}", JsonSerializer.Serialize(order));
            return false;
        }
    }
}