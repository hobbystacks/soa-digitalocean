using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System.Data.Common;
using System.Text;

namespace HobbyStacks.Api.IntegrationTests.Common.WebApplicationFactories;

public class TestDatabaseWebApplicationFactory<TProgram, TDbContext> : WebApplicationFactory<TProgram>
    where TProgram : class
    where TDbContext : DbContext
{
    // Use a GUID to prevent sharing database instance across test classes.
    private readonly string _dbName = $"EfCoreInMemoryDatabase_{Guid.NewGuid()}";

    protected override void ConfigureWebHost(IWebHostBuilder builder)
    {
        builder.ConfigureServices(services =>
        {
            var dbContextDescriptor = services.SingleOrDefault(
                d => d.ServiceType == typeof(DbContextOptions<TDbContext>)
            );

            if (dbContextDescriptor != null)
            {
                services.Remove(dbContextDescriptor);
            }

            var dbConnectionDescriptor = services.SingleOrDefault(
                d => d.ServiceType == typeof(DbConnection)
            );

            if (dbConnectionDescriptor != null)
            {
                services.Remove(dbConnectionDescriptor);
            }

            var config = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("secrets.json", true)
                .AddEnvironmentVariables()
                .Build();

            var connectionString = new StringBuilder()
                .Append($"Host={config["DB_HOST"]};")
                .Append($"Port={config["DB_PORT"]};")
                .Append($"Username={config["DB_USER"]};")
                .Append($"Password={config["DB_PASSWORD"]};")
                .Append($"Database={config["DB_NAME"]};")
                .Append($"Include Error Detail={true};")
                .ToString();

            services.AddDbContext<TDbContext>(options => options
                .UseNpgsql(connectionString, o => o.UseNodaTime())
                .EnableSensitiveDataLogging(true)
            );
        });

        builder.UseEnvironment("Development");
    }
}
