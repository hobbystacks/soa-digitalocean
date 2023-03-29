using HobbyStacks.Api.Common.Serialization.Json;
using HobbyStacks.Api.Features.History.Application.Models.Dto;

namespace HobbyStacks.Api.UnitTests.Common.JsonSerialization;

public class JsonSerializationTests
{
    [Fact]
    public void NewtonsoftJson_NodaTimeInstants()
    {
        var content = $"{{\"UserId\":1,\"Items\":[{{\"TeaId\":1,\"TeaName\":\"tea.name #1\",\"DateAdded\":\"2023-01-24T01:11:04.263555Z\"}},{{\"TeaId\":2,\"TeaName\":\"tea.name #2\",\"DateAdded\":\"2023-01-24T01:11:04.263555Z\"}}]}}";

        var history = Newtonsoft.Json.JsonConvert
            .DeserializeObject(
                content,
                JsonSerializationHelper.NewtonsoftJsonSerializerSettings
            );

        Assert.NotNull(history);
    }

    [Fact]
    public void SystemTextJson_NodaTimeInstants()
    {
        var content = $"{{\"UserId\":1,\"Items\":[{{\"TeaId\":1,\"TeaName\":\"tea.name #1\",\"DateAdded\":\"2023-01-24T01:11:04.263555Z\"}},{{\"TeaId\":2,\"TeaName\":\"tea.name #2\",\"DateAdded\":\"2023-01-24T01:11:04.263555Z\"}}]}}";

        var history = System.Text.Json.JsonSerializer
            .Deserialize<TeaHistoryDto>(
                content,
                JsonSerializationHelper.SystemTextJsonSerializerOptions
            );

        Assert.NotNull(history);
    }
}
