using Microsoft.AspNetCore.Mvc;
using TestCodifico.Interface.Models;
using TestCodifico.Interface.Repositories;

namespace TestCodifico.Api.Controllers;

[ApiController]
[Route("[controller]")]
public class ShippersController(IShipperRepository shipperRepository) : ControllerBase
{
    [HttpGet]
    public async Task<Shipper[]> GetAll(CancellationToken ct)
    {
        return await shipperRepository.GetAllShippers(ct);
    }
}