using System.Globalization;
using TestCodifico.Interface.Models;
using TestCodifico.Tests.Fixtures;

namespace TestCodifico.Tests;

[Collection("Api")]
public class CustomersTest(TestAppFactory<Program> factory)
{
    [Theory]
    // Data from DBSetup.sql
    [InlineData("Customer AHPOP", "2008-02-04 00:00:00.000", "2008-03-23 00:00:00.000")]
    [InlineData("Customer AHXHT", "2008-05-05 00:00:00.000", "2008-08-09 00:00:00.000")]
    [InlineData("Customer AZJED", "2008-04-09 00:00:00.000", "2008-05-20 00:00:00.000")]
    public async Task GetCustomersReturnsData(string customerName, string lastOrderDateString, string predictedOrderString)
    {
        DateTime lastOrderDate = DateTime.Parse(lastOrderDateString, CultureInfo.InvariantCulture);
        DateTime predictedOrder = DateTime.Parse(predictedOrderString, CultureInfo.InvariantCulture);
        // Arrange
        HttpClient client = factory.CreateClient();

        // Act
        HttpResponseMessage response = await client.GetAsync($"/Customers/prediction?customerName={customerName}");
        var customers = await response.Content.ReadFromJsonAsync<CustomerPrediction[]>();

        // Assert
        response.EnsureSuccessStatusCode();
        Assert.NotNull(customers);
        Assert.NotEmpty(customers);
        Assert.Contains(customers,
            c => c.CustomerName == customerName
                 && c.LastOrderDate == lastOrderDate
                 && c.NextPredictedOrder == predictedOrder
        );
    }
}