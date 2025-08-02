namespace TestCodifico.Interface.Models;

public record OrderDetail(
    int ProductId,
    double UnitPrice,
    int Qty,
    double Discount
    );