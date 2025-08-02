using Microsoft.Extensions.DependencyInjection;
using TestCodifico.Integration.Database;
using TestCodifico.Integration.Repositories;
using TestCodifico.Interface.Repositories;

namespace TestCodifico.Integration;

public static class ServiceInjector
{
    public static IServiceCollection AddIntegration(this IServiceCollection services)
    {
        services.AddSingleton<DatabaseConnector>();
        services.AddScoped<IEmployeeRepository, EmployeeRepository>();
        services.AddScoped<IShipperRepository, ShipperRepository>();
        services.AddScoped<IProductRepository, ProductRepository>();
        services.AddScoped<ICustomerRepository, CustomerRepository>();
        services.AddScoped<IOrderRepository, OrderRepository>();
        return services;
    }
}