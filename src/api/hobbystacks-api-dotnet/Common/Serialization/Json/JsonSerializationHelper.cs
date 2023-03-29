using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using NodaTime;
using NodaTime.Serialization.JsonNet;
using NodaTime.Serialization.SystemTextJson;
using System.Text.Encodings.Web;
using System.Text.Json;

namespace HobbyStacks.Api.Common.Serialization.Json;

/// <summary>
/// https://github.com/micro-elements/MicroElements.Swashbuckle.NodaTime#sample
/// </summary>
public class JsonSerializationHelper
{
    private static readonly Lazy<JsonSerializerSettings> _newtonsoftJsonSettings =
        new(ConfigureNewtonsoftJsonSettings(new JsonSerializerSettings()));

    private static readonly Lazy<JsonSerializerOptions> _systemTextJsonSettings =
        new(ConfigureSystemTextJsonSettings(new JsonSerializerOptions()));

    public static JsonSerializerSettings NewtonsoftJsonSerializerSettings => _newtonsoftJsonSettings.Value;
    public static JsonSerializerOptions SystemTextJsonSerializerOptions => _systemTextJsonSettings.Value;

    public static JsonSerializerSettings ConfigureNewtonsoftJsonSettings(JsonSerializerSettings settings)
    {
        // Use DefaultContractResolver or CamelCasePropertyNamesContractResolver;
        // settings.ContractResolver = new CamelCasePropertyNamesContractResolver();
        settings.ContractResolver = new DefaultContractResolver()
        {
            //NamingStrategy = new DefaultNamingStrategy()
            NamingStrategy = new CamelCaseNamingStrategy()
            //NamingStrategy = new SnakeCaseNamingStrategy()
        };

        // Configures JsonSerializer to properly serialize NodaTime types.
        settings.ConfigureForNodaTime(DateTimeZoneProviders.Tzdb);

        return settings;
    }
    public static JsonSerializerOptions ConfigureSystemTextJsonSettings(JsonSerializerOptions options)
    {
        // USING NewtonsoftJson settings as PropertyNamingPolicy for System.Text.Json.
        options.PropertyNamingPolicy = new NewtonsoftJsonNamingPolicy(NewtonsoftJsonSerializerSettings);
        options.Encoder = JavaScriptEncoder.UnsafeRelaxedJsonEscaping;

        // Configures JsonSerializer to properly serialize NodaTime types.
        options.ConfigureForNodaTime(DateTimeZoneProviders.Tzdb);

        return options;
    }
}
