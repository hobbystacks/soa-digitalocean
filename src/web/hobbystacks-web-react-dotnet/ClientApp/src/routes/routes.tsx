import App from "components/App/App";
import { Feature } from "flagged";
import Header from "layout/Header/Header";
import { createRoutesFromElements, Route } from "react-router-dom";
import RootErrorPage from "./RootErrorPage/RootErrorPage";
import ForecastPage from "./ForecastPage/ForecastPage";
import ForecastService from "services/Forecasts/ForecastService";

const createAppRoutes = (
  forecastService: ForecastService,
  {
    app = <App />,
    indexPage = <ForecastPage forecastService={forecastService} />,
    weatherPage = <ForecastPage forecastService={forecastService} />,
    registerPage = <Header />,
    loginPage = <Header />,
  } = {}
) => {
  const routes = createRoutesFromElements(
    <Route path="/" element={app} errorElement={<RootErrorPage />}>
      <Route index element={indexPage} />
      <Route path="weather" element={weatherPage} />
      <Route
        path="register"
        element={
          <Feature name="accounts">
            {(isEnabled) => {
              if (isEnabled) return registerPage;
              else throw new Error();
            }}
          </Feature>
        }
      />
      <Route
        path="login"
        element={
          <Feature name="accounts">
            {(isEnabled) => {
              if (isEnabled) return loginPage;
              else throw new Error();
            }}
          </Feature>
        }
      />
    </Route>
  );

  return routes;
};

export default createAppRoutes;
