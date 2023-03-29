import ForecastDto, { isForecastDto } from "objects/Forecasts/DTOs/ForecastDto";
import Forecast from "objects/Forecasts/Forecast";
import ForecastService from "./ForecastService";

class ApiForecastService implements ForecastService {
  async getForecasts(): Promise<Forecast[]> {
    const url = `${process.env.REACT_APP_API_WEATHER_BASEURL}/api/v1/weather`;
    const response = await fetch(encodeURI(url));

    if (response.ok && response.status === 200) {
      // Ensure the response JSON format was valid.
      const data = await response.json();

      if (
        Array.isArray(data) &&
        (data.length === 0 || data.some(isForecastDto))
      ) {
        // Map DTO to model.
        return data.map(
          (x: ForecastDto) =>
            ({
              date: x.date,
              summary: x.summary,
              temperatureC: x.temperatureC,
              temperatureF: x.temperatureF,
            } as Forecast)
        );
      } else {
        throw new TypeError("API response has an invalid format.");
      }
    } else {
      throw new Error("Unexpected error occured during API call.");
    }
  }
}

export default ApiForecastService;
