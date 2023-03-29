import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, Outlet, RouterProvider } from "react-router-dom";
import createAppRoutes from "routes/routes";
import ForecastService from "services/Forecasts/ForecastService";
import MemoryForecastService from "services/Forecasts/MemoryForecastService";
import Header from "./Header";

const renderWithRouter = (
  forecastService: ForecastService,
  element: JSX.Element
) => {
  const routes = createAppRoutes(forecastService, {
    app: (
      <>
        {element}
        <Outlet />
      </>
    ),
    indexPage: <h1>Home</h1>,
    weatherPage: <h1>Weather Forecasts</h1>,
    registerPage: <h1>Register</h1>,
    loginPage: <h1>Login</h1>,
  });
  const router = createMemoryRouter(routes, {
    initialEntries: ["/"],
  });
  return render(<RouterProvider router={router} />);
};

describe("Header", () => {
  it("displays all links and menu items", async () => {
    const forecastService: ForecastService = new MemoryForecastService();
    renderWithRouter(forecastService, <Header />);

    const linksHome = screen.getAllByRole("link", { name: /HobbyStacks/i });
    const linkWeather = screen.getByRole("link", { name: /Weather/i });

    expect(linksHome).toHaveLength(2);
    expect(linkWeather).toBeInTheDocument();
  });

  it("navigates to proper routes", async () => {
    const forecastService: ForecastService = new MemoryForecastService();
    renderWithRouter(forecastService, <Header />);

    const linksHome = screen.getAllByRole("link", { name: /HobbyStacks/i });
    const linkWeather = screen.getByRole("link", { name: /Weather/i });

    userEvent.click(linksHome[0]);
    expect(
      await screen.findByRole("heading", { name: /Home/i })
    ).toBeInTheDocument();

    userEvent.click(linkWeather);
    expect(
      await screen.findByRole("heading", { name: /Weather Forecasts/i })
    ).toBeInTheDocument();
  });
});
