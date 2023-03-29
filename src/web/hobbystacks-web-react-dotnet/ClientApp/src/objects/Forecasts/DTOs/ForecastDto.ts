export default interface ForecastDto {
  date: string;
  temperatureC: string;
  temperatureF: string;
  summary: string;
}

export const isForecastDto = (x: ForecastDto): x is ForecastDto => {
  return (
    x.date !== undefined &&
    x.temperatureC !== undefined &&
    x.temperatureF !== undefined &&
    x.summary !== undefined
  );
};
