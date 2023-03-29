import { render, screen } from "@testing-library/react";
import Forecast from "objects/Forecasts/Forecast";
import ForecastList from "./ForecastList";

describe("ForecastItem", () => {
  it("displays loading message", async () => {
    const data: Forecast[] = [];
    const isLoading = true;

    render(<ForecastList forecasts={data} isLoading={isLoading} />);

    expect(screen.getByRole("status")).toHaveTextContent(
      /We are loading the weather forecasts.../i
    );
    expect(
      screen.queryByRole("rowgroup", { name: "data" })
    ).not.toBeInTheDocument();
  });

  it("displays empty list message", async () => {
    const data: Forecast[] = [];
    const isLoading = false;

    render(<ForecastList forecasts={data} isLoading={isLoading} />);

    expect(screen.getByRole("status")).toHaveTextContent(
      /There are no weather forecasts available for the moment./i
    );
    expect(
      screen.queryByRole("rowgroup", { name: "data" })
    ).not.toBeInTheDocument();
  });

  it("displays all list items", async () => {
    const forecast: Forecast = {
      date: "2022-12-31",
      temperatureC: "31.1",
      temperatureF: "70.5",
      summary: "Perfect",
    };
    const data: Forecast[] = [forecast];
    const isLoading = false;

    render(<ForecastList forecasts={data} isLoading={isLoading} />);

    // Table Row Count = Data Rows + Header Row
    expect(screen.queryAllByRole("row")).toHaveLength(data.length + 1);
  });
});
