using Microsoft.AspNetCore.Mvc;
using TestCodifico.Interface.Models;
using TestCodifico.Interface.Repositories;

namespace TestCodifico.Api.Controllers;

[ApiController]
[Route("[controller]")]
public class CustomersController(ICustomerRepository customerRepository) : ControllerBase
{
    [HttpGet("prediction")]
    public async Task<CustomerPrediction[]> GetCustomerPredictions(CancellationToken ct, string customerName = "")
    {
        return await customerRepository.SaleDatePrediction(customerName, ct);
    }
}