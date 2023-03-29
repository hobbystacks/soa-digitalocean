using HobbyStacks.Api.Common;
using HobbyStacks.Api.Common.Serialization.Json;
using MicroElements.Swashbuckle.NodaTime;
using Microsoft.EntityFrameworkCore;
using NodaTime.Serialization.JsonNet;
using NodaTime.Serialization.SystemTextJson;
using Serilog;
using System.Text;

//JsonProvider jsonProvider = JsonProvider.SystemTextJson;
JsonProvider jsonProvider = JsonProvider.NewtonsoftJson;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddAutoMapper(typeof(Program));

var mvcBuilder = builder.Services
    .AddControllers();

if (jsonProvider == JsonProvider.NewtonsoftJson)
{
    mvcBuilder
        .AddNewtonsoftJson(options => JsonSerializationHelper
            .ConfigureNewtonsoftJsonSettings(options.SerializerSettings)
        );
}
else if (jsonProvider == JsonProvider.SystemTextJson)
{
    mvcBuilder
        .AddJsonOptions(options => JsonSerializationHelper
            .ConfigureSystemTextJsonSettings(options.JsonSerializerOptions)
        );
}

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options
        .CustomSchemaIds(type => SwashbuckleSchemaHelper.GetSchemaId(type));

    // Configures swagger to use NodaTime with serializerSettings.
    if (jsonProvider == JsonProvider.NewtonsoftJson)
    {
        options.ConfigureForNodaTime(
            JsonSerializationHelper.NewtonsoftJsonSerializerSettings,
            shouldGenerateExamples: true
        );
    }
    else if (jsonProvider == JsonProvider.SystemTextJson)
    {
        options.ConfigureForNodaTimeWithSystemTextJson(
            JsonSerializationHelper.SystemTextJsonSerializerOptions,
            shouldGenerateExamples: true
        );
    }
});

// Services required for APIs.
var config = builder.Configuration
    .SetBasePath(Directory.GetCurrentDirectory())
    .AddJsonFile("secrets.json", true)
    .AddEnvironmentVariables()
    .Build();

var connectionString = new StringBuilder()
    .Append($"Host={config["DB_HOST"]};")
    .Append($"Port={config["DB_PORT"]};")
    .Append($"Username={config["DB_USER"]};")
    .Append($"Password={config["DB_PASSWORD"]};")
    .Append($"Database={config["DB_NAME"]}")
    .ToString();

//TODO: AddDbContext()

// Enable Serilog for ASP.NET Core.
//builder.Host.UseSerilog();
builder.Host.UseSerilog((context, config) => config
    .WriteTo.Console()
);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();

// Required for integration tests as per Microsoft documentation!
// Reference: https://learn.microsoft.com/en-us/aspnet/core/test/integration-tests?view=aspnetcore-7.0#basic-tests-with-the-default-webapplicationfactory
public partial class Program { }