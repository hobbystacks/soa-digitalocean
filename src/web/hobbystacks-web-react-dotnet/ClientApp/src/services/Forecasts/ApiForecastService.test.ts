import { mockFetch } from "utils/tests";
import ForecastDto from "objects/Forecasts/DTOs/ForecastDto";
import ApiForecastService from "./ApiForecastService";
import ForecastService from "./ForecastService";

describe("ApiForecastService", () => {
  const API_BASE_URL = `${process.env.REACT_APP_API_WEATHER_BASEURL}`;

  beforeEach(() => {
    jest.restoreAllMocks();
  });

  describe("GET /weather", () => {
    const GetWeatherUrl = `${API_BASE_URL}/api/v1/weather`;

    it("returns latest weather forecasts", async () => {
      var fetchGetForecastsUrl = GetWeatherUrl;
      var fetchGetForecastsResponse = {
        ok: true,
        status: 200,
        json: async () =>
          Array.from(
            { length: 5 },
            (v, k) =>
              ({
                date: "2022-12-31",
                temperatureC: "31.1",
                temperatureF: "70.5",
                summary: "Perfect",
              } as ForecastDto)
          ),
      } as Response;
      var fetchGetForecastsSpy = jest
        .spyOn(window, "fetch")
        .mockImplementation(
          mockFetch(fetchGetForecastsUrl, fetchGetForecastsResponse)
        );
      var forecastService: ForecastService = new ApiForecastService();

      var results = await forecastService.getForecasts();

      expect(results).toBeDefined();
      expect(results).toHaveLength(5);
      expect(fetchGetForecastsSpy).toBeCalledTimes(1);
    });

    it("when no weather forecasts exist, returns empty list", async () => {
      var fetchGetForecastsUrl = GetWeatherUrl;
      var fetchGetForecastsResponse = {
        ok: true,
        status: 200,
        json: async () => [] as ForecastDto[],
      } as Response;
      var fetchGetForecastsSpy = jest
        .spyOn(window, "fetch")
        .mockImplementation(
          mockFetch(fetchGetForecastsUrl, fetchGetForecastsResponse)
        );
      var forecastService: ForecastService = new ApiForecastService();

      var results = await forecastService.getForecasts();

      expect(results).toBeDefined();
      expect(results).toHaveLength(0);
      expect(fetchGetForecastsSpy).toBeCalledTimes(1);
    });

    it("when invalid JSON format for response content, throws TypeError", async () => {
      const returned: any = {
        wrong_property: "",
      };
      var fetchGetForecastsUrl = GetWeatherUrl;
      var fetchGetForecastsResponse = {
        ok: true,
        status: 200,
        json: async () => [returned],
      } as Response;
      var fetchGetForecastsSpy = jest
        .spyOn(window, "fetch")
        .mockImplementation(
          mockFetch(fetchGetForecastsUrl, fetchGetForecastsResponse)
        );
      var forecastService: ForecastService = new ApiForecastService();

      expect.assertions(2);
      await expect(forecastService.getForecasts()).rejects.toThrowError(
        TypeError
      );
      expect(fetchGetForecastsSpy).toBeCalled();
    });
  });
});
