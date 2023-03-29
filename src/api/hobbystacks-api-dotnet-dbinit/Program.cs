using DbUp;
using DbUp.Engine;
using DbUp.Helpers;
using DbUp.Support;
using Microsoft.Extensions.Configuration;
using System.Reflection;
using System.Text;

var config = new ConfigurationBuilder()
    .SetBasePath(Directory.GetCurrentDirectory())
    .AddJsonFile("secrets.json", true)
    .AddEnvironmentVariables()
    .Build();

Console.WriteLine($"> Processing arguments...");
bool dropDatabase = false;
bool seedTestData = false;

if (args.Length > 0)
{
    foreach (var arg in args)
    {
        Console.WriteLine($"Found argument [{arg}]");
    }

    dropDatabase = args.Contains("drop");
    seedTestData = args.Contains("seedTestData");
}
else
{
    Console.WriteLine("No arguments");
}
Console.WriteLine();

var connectionString = new StringBuilder()
    .Append($"Host={config["DB_HOST"]};")
    .Append($"Port={config["DB_PORT"]};")
    .Append($"Username={config["DB_USER"]};")
    .Append($"Password={config["DB_PASSWORD"]};")
    .Append($"Database={config["DB_NAME"]}")
    .ToString();

//if (dropDatabase)
//{
//    Console.WriteLine($"> Dropping database [{config["DB_NAME"]}]...");
//    DropDatabase.For.PostgresqlDatabase(connectionString);
//    Console.WriteLine();
//}

Console.WriteLine($"> Ensuring database [{config["DB_NAME"]}] is created...");
EnsureDatabase.For.PostgresqlDatabase(connectionString);
Console.WriteLine();

var upgradeEngineBuilder = DeployChanges.To
    .PostgresqlDatabase(connectionString, null) //null or "" for default schema for user
    .LogToConsole();

if (seedTestData)
{
    Console.WriteLine($"> Including scripts to seed test data...");
    upgradeEngineBuilder = upgradeEngineBuilder
        .WithScriptsEmbeddedInAssembly(Assembly.GetExecutingAssembly(), script =>
        {
            return script.StartsWith("HobbyStacks.Api.DbInit.Scripts.Seed.");
        });
    Console.WriteLine();
}

var upgrader = upgradeEngineBuilder.Build();

Console.WriteLine("Is upgrade required: " + upgrader.IsUpgradeRequired());

if (args.Any(a => "--generateReport".Equals(a, StringComparison.InvariantCultureIgnoreCase)))
{
    upgrader.GenerateUpgradeHtmlReport("UpgradeReport.html");
}
else
{
    var result = upgrader.PerformUpgrade();

    // Display the result
    if (result.Successful)
    {
        Console.ForegroundColor = ConsoleColor.Green;
        Console.WriteLine("Success!");
    }
    else
    {
        Console.ForegroundColor = ConsoleColor.Red;
        Console.WriteLine(result.Error);
        Console.WriteLine("Failed!");
    }
}
