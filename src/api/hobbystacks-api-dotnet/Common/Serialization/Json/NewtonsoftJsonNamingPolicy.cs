using Newtonsoft.Json.Serialization;
using Newtonsoft.Json;
using System.Text.Json;

namespace HobbyStacks.Api.Common.Serialization.Json;

public class NewtonsoftJsonNamingPolicy : JsonNamingPolicy
{
    private readonly JsonSerializerSettings _jsonSerializerSettings;

    /// <inheritdoc />
    public NewtonsoftJsonNamingPolicy(JsonSerializerSettings jsonSerializerSettings)
    {
        _jsonSerializerSettings = jsonSerializerSettings;
    }

    /// <inheritdoc />
    public override string ConvertName(string name)
    {
        var contractResolver = _jsonSerializerSettings.ContractResolver;
        return (contractResolver as DefaultContractResolver)?.GetResolvedPropertyName(name) ?? name;
    }
}
