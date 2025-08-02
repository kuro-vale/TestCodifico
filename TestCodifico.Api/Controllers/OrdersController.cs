using Microsoft.AspNetCore.Mvc;
using TestCodifico.Interface.Models;
using TestCodifico.Interface.Repositories;

namespace TestCodifico.Api.Controllers;

[ApiController]
[Route("[controller]")]
public class OrdersController(IOrderRepository orderRepository) : ControllerBase
{
    [HttpGet("clients/{clientName}")]
    public async Task<ClientOrder[]> GetClientOrders(string clientName, CancellationToken ct)
    {
        return await orderRepository.GetClientOrders(clientName, ct);
    }

    [HttpPost("clients/{clientName}")]
    public async Task<IActionResult> AddNewOrder(string clientName, [FromBody] Order orderRequest, CancellationToken ct)
    {
        bool result = await orderRepository.AddNewOrder(clientName, orderRequest, ct);
        return result ? Created() : BadRequest();
    }
}