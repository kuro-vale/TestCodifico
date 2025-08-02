using TestCodifico.Interface.Models;

namespace TestCodifico.Interface.Repositories;

public interface ICustomerRepository
{
    Task<CustomerPrediction[]> SaleDatePrediction(string customerName, CancellationToken ct);
}