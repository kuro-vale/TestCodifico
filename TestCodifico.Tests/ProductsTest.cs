using TestCodifico.Interface.Models;
using TestCodifico.Tests.Fixtures;

namespace TestCodifico.Tests;

[Collection("Api")]
public class ProductsTest(TestAppFactory<Program> factory)
{
    [Theory]
    // Data from DBSetup.sql
    [InlineData("Product HHYDP")]
    [InlineData("Product RECZE")]
    public async Task GetProductsReturnsData(string productName)
    {
        // Arrange
        HttpClient client = factory.CreateClient();

        // Act
        HttpResponseMessage response = await client.GetAsync("/Products");
        var products = await response.Content.ReadFromJsonAsync<Product[]>();

        // Assert
        response.EnsureSuccessStatusCode();
        Assert.NotNull(products);
        Assert.NotEmpty(products);
        Assert.Contains(products, p => p.ProductName == productName);
    }
}