import { render, screen, waitFor } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import createAppRoutes from "routes/routes";
import ForecastService from "services/Forecasts/ForecastService";
import MemoryForecastService from "services/Forecasts/MemoryForecastService";

const renderWithRouter = (
  forecastService: ForecastService,
  { route = "/" } = {}
) =>
  render(
    <RouterProvider
      router={createMemoryRouter(createAppRoutes(forecastService), {
        initialEntries: [route],
      })}
    />
  );

describe("App", () => {
  it("renders all sections", async () => {
    const forecastService: ForecastService = new MemoryForecastService();
    const spyGet = jest.spyOn(forecastService, "getForecasts");

    renderWithRouter(forecastService);

    await waitFor(() => expect(spyGet).toBeCalledTimes(1));
    expect(
      screen.getByRole("heading", { name: /weather forecasts/i })
    ).toBeInTheDocument();
  });

  it("handles invalid routes", async () => {
    const forecastService: ForecastService = new MemoryForecastService();
    const badRoute = "/some/bad/route";

    renderWithRouter(forecastService, { route: badRoute });

    await waitFor(() => expect(document.title).toEqual("HobbyStacks - 404"));
    expect(
      screen.getByRole("heading", { name: /not found/i })
    ).toBeInTheDocument();
  });
});
