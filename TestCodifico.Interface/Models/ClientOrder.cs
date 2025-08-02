namespace TestCodifico.Interface.Models;

public record ClientOrder(
    int OrderId,
    DateTime RequiredDate,
    DateTime ShippedDate,
    string ShipName,
    string ShipAddress,
    string ShipCity
);