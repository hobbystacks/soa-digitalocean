using HobbyStacks.Api.Common.Models;
using HobbyStacks.Api.Common.Serialization.Json;
using HobbyStacks.Api.Features.Weather.Domain.Entities;
using NodaTime;
using NodaTime.Text;

namespace HobbyStacks.Api.UnitTests.Common.JsonSerialization;

public class JsonSerializationTests
{
    private class ClassWithNodaTimeProperty
    {
        public Instant? Date { get; set; }
    }

    [Fact]
    public void NewtonsoftJson_NodaTimeInstants()
    {
        var content = $"{{\"date\":\"2023-01-24T01:11:04.263555Z\"}}";
        var expected = new ClassWithNodaTimeProperty
        {
            Date = InstantPattern.ExtendedIso.Parse("2023-01-24T01:11:04.263555Z").Value
        };

        var result = Newtonsoft.Json.JsonConvert
            .DeserializeObject<ClassWithNodaTimeProperty>(
                content,
                JsonSerializationHelper.NewtonsoftJsonSerializerSettings
            );

        Assert.NotNull(result);
        Assert.Equal(expected.Date, result.Date);
    }

    [Fact]
    public void SystemTextJson_NodaTimeInstants()
    {
        var content = $"{{\"date\":\"2023-01-24T01:11:04.263555Z\"}}";
        var expected = new ClassWithNodaTimeProperty
        {
            Date = InstantPattern.ExtendedIso.Parse("2023-01-24T01:11:04.263555Z").Value
        };

        var result = System.Text.Json.JsonSerializer
            .Deserialize<ClassWithNodaTimeProperty>(
                content,
                JsonSerializationHelper.SystemTextJsonSerializerOptions
            );

        Assert.NotNull(result);
        Assert.Equal(expected.Date, result.Date);
    }

    [Fact]
    public void NewtonsoftJson_WeatherForecastList()
    {
        var content = $"[{{\"date\":\"2022-12-31\",\"temperatureC\":32,\"temperatureF\":89,\"summary\":\"Perfect\"}}]";
        var expected = new WeatherForecast
        {
            Date = new DateOnly(2022, 12, 31),
            TemperatureC = 32,
            Summary = "Perfect"
        };

        var forecasts = Newtonsoft.Json.JsonConvert
            .DeserializeObject<IEnumerable<WeatherForecast>>(
                content,
                JsonSerializationHelper.NewtonsoftJsonSerializerSettings
            );

        Assert.NotNull(forecasts);
        Assert.NotEmpty(forecasts);

        var forecast = forecasts.First();
        Assert.Equal(expected.Date, forecast.Date);
        Assert.Equal(expected.TemperatureC, forecast.TemperatureC);
        Assert.Equal(expected.Summary, forecast.Summary);
    }

    [Fact]
    public void SystemTextJson_WeatherForecastList()
    {
        var content = $"[{{\"date\":\"2022-12-31\",\"temperatureC\":32,\"temperatureF\":89,\"summary\":\"Perfect\"}}]";
        var expected = new WeatherForecast
        {
            Date = new DateOnly(2022, 12, 31),
            TemperatureC = 32,
            Summary = "Perfect"
        };

        var forecasts = System.Text.Json.JsonSerializer
            .Deserialize<IEnumerable<WeatherForecast>>(
                content,
                JsonSerializationHelper.SystemTextJsonSerializerOptions
            );

        Assert.NotNull(forecasts);
        Assert.NotEmpty(forecasts);

        var forecast = forecasts.First();
        Assert.Equal(expected.Date, forecast.Date);
        Assert.Equal(expected.TemperatureC, forecast.TemperatureC);
        Assert.Equal(expected.Summary, forecast.Summary);
    }
}
