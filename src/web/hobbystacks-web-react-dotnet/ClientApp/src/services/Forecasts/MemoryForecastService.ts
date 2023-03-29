import Forecast from "objects/Forecasts/Forecast";
import ForecastService from "./ForecastService";

export default class MemoryForecastService implements ForecastService {
  private _items: Forecast[];

  constructor(items: Forecast[] = []) {
    this._items = items;
  }

  public async getForecasts(): Promise<Forecast[]> {
    // throw new Error();

    // Use the spread operator to simulate the service boundary returning
    // a new array from the API call. This will let React identify state
    // change, thus re-rendering the component.
    return [...this._items];
  }
}
