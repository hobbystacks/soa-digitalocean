// This file is automatically registered when starting the development server.
//
// Docs:
// https://create-react-app.dev/docs/proxying-api-requests-in-development/#configuring-the-proxy-manually
const { createProxyMiddleware } = require("http-proxy-middleware");
const { env } = require("process");
const morgan = require("morgan");

const target = env.ASPNETCORE_HTTPS_PORT
  ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}`
  : env.ASPNETCORE_URLS
  ? env.ASPNETCORE_URLS.split(";")[0]
  : "http://localhost:9010";

const onError = (err, req, resp, target) => {
  console.error(`${err.message}`);
};

module.exports = function (app) {
  const weatherForecastProxy = createProxyMiddleware("/api/v1/weather", {
    target: target,
    // Handle errors to prevent the proxy middleware from crashing when
    // the ASP NET Core webserver is unavailable
    onError: onError,
    secure: false,
    // Uncomment this line to add support for proxying websockets
    //ws: true,
    headers: {
      Connection: "Keep-Alive",
    },
  });

  app.use(weatherForecastProxy);
  app.use(morgan("dev"));
};
