namespace TestCodifico.Interface.Models;

public record CustomerPrediction(
    string CustomerName,
    DateTime LastOrderDate,
    DateTime NextPredictedOrder
);