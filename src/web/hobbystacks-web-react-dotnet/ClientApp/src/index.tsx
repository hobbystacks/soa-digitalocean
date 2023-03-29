import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { FlagsProvider } from "flagged";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import createAppRoutes from "routes/routes";
import ApiForecastService from "services/Forecasts/ApiForecastService";
import ForecastService from "services/Forecasts/ForecastService";
import theme from "theme";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

// const forecastService: ForecastService = new MemoryForecastService(
//   MOCK_FORECASTS
// );
const forecastService: ForecastService = new ApiForecastService();

const baseUrl =
  document.getElementsByTagName("base")[0].getAttribute("href") ?? undefined;
const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement!);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <FlagsProvider features={{ accounts: false }}>
        <RouterProvider
          router={createBrowserRouter(createAppRoutes(forecastService), {
            basename: baseUrl,
          })}
        />
      </FlagsProvider>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
