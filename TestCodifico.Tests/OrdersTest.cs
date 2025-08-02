using System.Net;
using TestCodifico.Interface.Models;
using TestCodifico.Interface.Repositories;
using TestCodifico.Tests.Fixtures;

namespace TestCodifico.Tests;

[Collection("Api")]
public class OrdersTest(TestAppFactory<Program> factory)
{
    private IOrderRepository OrderRepository => factory.Services.GetRequiredService<IOrderRepository>();

    [Theory]
    // Data from DBSetup.sql
    [InlineData("Customer NRZBB", 6)]
    [InlineData("Customer MLTDN", 4)]
    [InlineData("Customer DTDMN", 0)]
    public async Task GetClientOrdersReturnData(string clientName, int expectedLength)
    {
        // Arrange
        HttpClient client = factory.CreateClient();

        // Act
        HttpResponseMessage response = await client.GetAsync($"/Orders/clients/{clientName}");
        var orders = await response.Content.ReadFromJsonAsync<ClientOrder[]>();

        // Assert
        response.EnsureSuccessStatusCode();
        Assert.NotNull(orders);
        Assert.Equal(expectedLength, orders.Length);
    }

    [Fact]
    public async Task AddNewOrder()
    {
        // Arrange
        HttpClient client = factory.CreateClient();
        CancellationToken ct = CancellationToken.None;
        const string customerName = "Customer DTDMN";
        int initialOrderCount = (await OrderRepository.GetClientOrders(customerName, ct)).Length;
        var newOrder = new Order(null, 1, 1, "TestShip", "TestAddress", "TestCity", DateTime.Now, DateTime.Now,
            DateTime.Now, 1.123, "TestCountry",
            new OrderDetails(
                1, 2.123, 1, 0.80, null
            )
        );
        // Act
        HttpResponseMessage response =
            await client.PostAsJsonAsync($"Orders/clients/{customerName}", newOrder, cancellationToken: ct);
        int newOrderCount = (await OrderRepository.GetClientOrders(customerName, CancellationToken.None)).Length;

        // Assert
        response.EnsureSuccessStatusCode();
        Assert.NotEqual(initialOrderCount, newOrderCount);
    }

    [Fact]
    public async Task AddNewOrderRollbackTransactionOnError()
    {
        // Arrange
        HttpClient client = factory.CreateClient();
        CancellationToken ct = CancellationToken.None;
        const string customerName = "Customer DTDMN";
        int initialOrderCount = (await OrderRepository.GetClientOrders(customerName, ct)).Length;
        var newOrder = new Order(null, 1, 1, "TestShip", "TestAddress", "TestCity", DateTime.Now, DateTime.Now,
            DateTime.Now, 1.123, "TestCountry",
            new OrderDetails(
                -1, 2.123, 1, 0.80, null
            )
        );
        // Act
        HttpResponseMessage response =
            await client.PostAsJsonAsync($"Orders/clients/{customerName}", newOrder, cancellationToken: ct);
        int newOrderCount = (await OrderRepository.GetClientOrders(customerName, CancellationToken.None)).Length;

        // Assert
        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
        Assert.Equal(initialOrderCount, newOrderCount);
    }
}