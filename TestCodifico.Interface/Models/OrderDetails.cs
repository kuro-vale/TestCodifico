namespace TestCodifico.Interface.Models;

public record OrderDetails(
    int ProductId,
    double UnitPrice,
    int Qty,
    double Discount,
    int? OrderId
);