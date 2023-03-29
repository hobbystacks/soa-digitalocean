import { render, screen, waitFor } from "@testing-library/react";
import { createMemoryRouter, Outlet, RouterProvider } from "react-router-dom";
import createAppRoutes from "routes/routes";
import ForecastService from "services/Forecasts/ForecastService";
import MemoryForecastService from "services/Forecasts/MemoryForecastService";
import RootErrorPage from "./RootErrorPage";

const renderWithRouter = (
  forecastService: ForecastService,
  element: JSX.Element
) => {
  const router = createMemoryRouter(
    createAppRoutes(forecastService, {
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
    })
  );
  return render(<RouterProvider router={router} />);
};

describe("RootErrorPage", () => {
  it("displays all fields", async () => {
    const forecastService: ForecastService = new MemoryForecastService();
    renderWithRouter(forecastService, <RootErrorPage />);

    await waitFor(() => expect(document.title).toEqual("HobbyStacks - Error"));
    expect(
      screen.getByRole("heading", { name: /unexpected error/i })
    ).toBeInTheDocument();
  });
});
