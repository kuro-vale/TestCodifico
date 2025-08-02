using TestCodifico.Interface.Models;
using TestCodifico.Tests.Fixtures;

namespace TestCodifico.Tests;

[Collection("Api")]
public class ShippersTest(TestAppFactory<Program> factory)
{
    [Theory]
    // Data from DBSetup.sql
    [InlineData("Shipper GVSUA")]
    [InlineData("Shipper ETYNR")]
    public async Task GetShippersReturnsData(string companyName)
    {
        // Arrange
        HttpClient client = factory.CreateClient();

        // Act
        HttpResponseMessage response = await client.GetAsync("/Shippers");
        var shippers = await response.Content.ReadFromJsonAsync<Shipper[]>();

        // Assert
        response.EnsureSuccessStatusCode();
        Assert.NotNull(shippers);
        Assert.NotEmpty(shippers);
        Assert.Contains(shippers, s => s.CompanyName == companyName);
    }
}