import { styled, TableCell, TableRow } from "@mui/material";
import Forecast from "objects/Forecasts/Forecast";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
}));

interface ForecastProps {
  forecast: Forecast;
}

function ForecastItem(props: ForecastProps) {
  const { forecast } = props;

  return (
    <StyledTableRow>
      <TableCell align="center">{forecast.date}</TableCell>
      <TableCell align="center">{forecast.temperatureC}</TableCell>
      <TableCell align="center">{forecast.temperatureF}</TableCell>
      <TableCell align="left">{forecast.summary}</TableCell>
    </StyledTableRow>
  );
}

export default ForecastItem;
