using TestCodifico.Interface.Models;

namespace TestCodifico.Interface.Repositories;

public interface IOrderRepository
{
    Task<ClientOrder[]> GetClientOrders(string clientName, CancellationToken ct);

    Task<bool> AddNewOrder(string clientName, Order order, CancellationToken ct);
}