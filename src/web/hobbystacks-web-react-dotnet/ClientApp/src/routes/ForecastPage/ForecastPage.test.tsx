import { render, screen, waitFor } from "@testing-library/react";
import Forecast from "objects/Forecasts/Forecast";
import ForecastService from "services/Forecasts/ForecastService";
import MemoryForecastService from "services/Forecasts/MemoryForecastService";
import renderWithUserEvent from "utils/tests";
import ForecastPage from "./ForecastPage";

describe("ForecastPage", () => {
  it("displays all sections", async () => {
    const forecastService: ForecastService = new MemoryForecastService();
    const spyGetForecasts = jest.spyOn(forecastService, "getForecasts");

    render(<ForecastPage forecastService={forecastService} />);

    await waitFor(() =>
      expect(document.title).toEqual("HobbyStacks - Weather Forecasts")
    );
    await waitFor(() => expect(spyGetForecasts).toBeCalledTimes(1));
  });

  it("handles 'ForecastService.getForecasts' errors", async () => {
    const data: Forecast[] = [];
    const forecastService: ForecastService = new MemoryForecastService(data);
    const spyGetForecasts = jest
      .spyOn(forecastService, "getForecasts")
      .mockImplementation(() => {
        throw new Error();
      });

    const { user } = renderWithUserEvent(
      <ForecastPage forecastService={forecastService} />
    );

    await waitFor(() => expect(spyGetForecasts).toBeCalledTimes(1));
    await waitFor(() => expect(spyGetForecasts).toThrowError());
    expect(
      await screen.findByRole("status", { name: "errors" })
    ).toHaveTextContent(
      "Could not load weather forecasts. Please try again later..."
    );
  });
});
