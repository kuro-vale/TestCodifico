using System.Data.Common;
using Dapper;
using TestCodifico.Integration.Database;
using TestCodifico.Interface.Models;
using TestCodifico.Interface.Repositories;

namespace TestCodifico.Integration.Repositories;

public class EmployeeRepository(DatabaseConnector connector) : IEmployeeRepository
{
    public async Task<Employee[]> GetAllEmployees(CancellationToken ct)
    {
        // language=sql
        const string sql =
            """
            SELECT
                empid AS EmpId,
                firstname + ' ' + lastname as FullName
            FROM HR.Employees
            """;
        var command = new CommandDefinition(sql, ct);
        await using DbConnection connection = connector.GetConnection();
        var result = await connection.QueryAsync<Employee>(command);
        return result.ToArray();
    }
}