namespace TestCodifico.Interface.Models;

public record Order(
    int? CustomerId,
    int EmployeeId,
    int ShipperId,
    string ShipName,
    string ShipAddress,
    string ShipCity,
    DateTime OrderDate,
    DateTime RequiredDate,
    DateTime ShippedDate,
    double Freight,
    string ShipCountry,
    OrderDetails Details
);