using Microsoft.AspNetCore.Mvc;
using TestCodifico.Interface.Models;
using TestCodifico.Interface.Repositories;

namespace TestCodifico.Api.Controllers;

[ApiController]
[Route("[controller]")]
public class EmployeesController(IEmployeeRepository employeeRepository) : ControllerBase
{
    [HttpGet]
    public async Task<Employee[]> GetAll(CancellationToken ct)
    {
        return await employeeRepository.GetAllEmployees(ct);
    }
}