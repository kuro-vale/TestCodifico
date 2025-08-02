using TestCodifico.Interface.Models;
using TestCodifico.Tests.Fixtures;

namespace TestCodifico.Tests;

[Collection("Api")]
public class EmployeesTest(TestAppFactory<Program> factory)
{
    [Theory]
    // Data from DBSetup.sql
    [InlineData("Sara Davis")]
    [InlineData("Don Funk")]
    public async Task GetEmployeesReturnsData(string fullName)
    {
        // Arrange
        HttpClient client = factory.CreateClient();

        // Act
        HttpResponseMessage response = await client.GetAsync("/Employees");
        var employees = await response.Content.ReadFromJsonAsync<Employee[]>();

        // Assert
        response.EnsureSuccessStatusCode();
        Assert.NotNull(employees);
        Assert.NotEmpty(employees);
        Assert.Contains(employees, e => e.FullName == fullName);
    }
}