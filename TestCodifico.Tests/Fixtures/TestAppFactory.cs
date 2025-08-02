using Microsoft.AspNetCore.Mvc.Testing;
using TestCodifico.Integration.Database;

namespace TestCodifico.Tests.Fixtures;

public sealed class TestAppFactory<TProgram> : WebApplicationFactory<TProgram> where TProgram : class
{
    private readonly IConfiguration _configuration;

    public TestAppFactory()
    {
        _configuration = Services.GetRequiredService<IConfiguration>();
    }

    protected override void ConfigureWebHost(IWebHostBuilder builder)
    {
        base.ConfigureWebHost(builder);
        builder.UseEnvironment("Tests");
    }

    protected override void Dispose(bool disposing)
    {
        DatabaseInitializer.Drop(_configuration);
        base.Dispose(disposing);
    }
}