import Forecast from "objects/Forecasts/Forecast";

export default interface ForecastService {
  getForecasts(): Promise<Forecast[]>;
}
