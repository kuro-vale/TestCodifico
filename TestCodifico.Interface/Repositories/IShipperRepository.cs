using TestCodifico.Interface.Models;

namespace TestCodifico.Interface.Repositories;

public interface IShipperRepository
{
    Task<Shipper[]> GetAllShippers(CancellationToken ct);
}