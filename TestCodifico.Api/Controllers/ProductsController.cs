using Microsoft.AspNetCore.Mvc;
using TestCodifico.Interface.Models;
using TestCodifico.Interface.Repositories;

namespace TestCodifico.Api.Controllers;

[ApiController]
[Route("[controller]")]
public class ProductsController(IProductRepository productRepository) : ControllerBase
{
    [HttpGet]
    public async Task<Product[]> GetAll(CancellationToken ct)
    {
        return await productRepository.GetAllProducts(ct);
    }
}