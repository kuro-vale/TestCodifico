using TestCodifico.Interface.Models;

namespace TestCodifico.Interface.Repositories;

public interface IProductRepository
{
    Task<Product[]> GetAllProducts(CancellationToken ct);
}