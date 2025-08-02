using TestCodifico.Interface.Models;

namespace TestCodifico.Interface.Repositories;

public interface IEmployeeRepository
{
    Task<Employee[]> GetAllEmployees(CancellationToken ct);
}