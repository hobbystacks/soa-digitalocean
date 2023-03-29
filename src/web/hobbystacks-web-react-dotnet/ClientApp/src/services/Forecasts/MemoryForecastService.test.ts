import Forecast from "objects/Forecasts/Forecast";
import ForecastService from "./ForecastService";
import MemoryForecastService from "./MemoryForecastService";

describe("MemoryForecastService", () => {
  it("returns empty list initially", async () => {
    const forecastService: ForecastService = new MemoryForecastService();

    const forecasts = await forecastService.getForecasts();

    expect(forecasts).toBeDefined();
    expect(forecasts).toHaveLength(0);
  });

  it("returns existing items in initial list", async () => {
    const data = [
      {
        date: "2022-12-31",
        temperatureC: "31.1",
        temperatureF: "70.5",
        summary: "Perfect",
      },
    ] as Forecast[];
    const forecastService: ForecastService = new MemoryForecastService(data);

    const forecasts = await forecastService.getForecasts();

    expect(forecasts).toBeDefined();
    expect(forecasts).toHaveLength(1);
  });
});
