import { Alert, AlertTitle, Stack, Typography } from "@mui/material";
import ForecastList from "components/ForecastList/ForecastList";
import Forecast from "objects/Forecasts/Forecast";
import { useCallback, useEffect, useState } from "react";
import ForecastService from "services/Forecasts/ForecastService";

interface ForecastPageProps {
  forecastService: ForecastService;
}

const ForecastPage = (props: ForecastPageProps) => {
  const { forecastService } = props;

  const [forecasts, setForecasts] = useState<Forecast[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [alerts, setAlerts] = useState<string[]>([]);

  const fetchData = useCallback(async () => {
    try {
      const data = await forecastService.getForecasts();

      setForecasts(data);
      setIsLoading(false);
      setAlerts([]);
    } catch (e) {
      // console.log(e);
      setAlerts([
        "Could not load weather forecasts. Please try again later...",
      ]);
    }
  }, [forecastService]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const title = "Weather Forecasts";

  // Set HTML5 document's title. (Breaks definition of pure components...)
  document.title = `HobbyStacks - ${title}`;
  const renderAlerts = () => (
    <Stack role="status" aria-label="errors" spacing={2}>
      {alerts.map((alert, idx) => (
        <Alert key={idx} severity="error">
          <AlertTitle>Error</AlertTitle>
          {alert}
        </Alert>
      ))}
    </Stack>
  );

  return (
    <Stack component="section" spacing={2}>
      <Typography variant="h1" sx={{ alignSelf: "center" }}>
        {title}
      </Typography>

      {alerts.length > 0 && renderAlerts()}

      <ForecastList forecasts={forecasts} isLoading={isLoading} />
    </Stack>
  );
};

export default ForecastPage;
