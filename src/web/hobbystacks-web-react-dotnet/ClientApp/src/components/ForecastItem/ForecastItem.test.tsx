import { render, screen } from "@testing-library/react";
import Forecast from "objects/Forecasts/Forecast";
import ForecastItem from "./ForecastItem";

describe("ForecastItem", () => {
  it("displays all properties", () => {
    const forecast: Forecast = {
      date: "2022-12-31",
      temperatureC: "31.1",
      temperatureF: "70.5",
      summary: "Perfect",
    };

    render(<ForecastItem forecast={forecast} />);

    expect(screen.getAllByRole("cell")).toHaveLength(4);

    expect(
      screen.getByRole("cell", { name: forecast.date })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("cell", { name: forecast.temperatureC })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("cell", { name: forecast.temperatureF })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("cell", { name: forecast.summary })
    ).toBeInTheDocument();
  });
});
