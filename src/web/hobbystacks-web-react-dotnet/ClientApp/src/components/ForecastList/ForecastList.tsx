import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import ForecastItem from "components/ForecastItem/ForecastItem";
import Forecast from "objects/Forecasts/Forecast";
import Paper from "@mui/material/Paper";

interface ForecastListProps {
  forecasts: Forecast[];
  isLoading: boolean;
}

function ForecastList(props: ForecastListProps) {
  const { forecasts, isLoading } = props;

  const renderLoading = () => (
    <div className="row">
      <div className="col-sm-12">
        <p role="status">We are loading the weather forecasts...</p>
      </div>
    </div>
  );

  const renderEmpty = () => (
    <div className="row">
      <div className="col-sm-12">
        <p role="status">
          There are no weather forecasts available for the moment.
        </p>
      </div>
    </div>
  );

  const renderList = () => (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="caption table">
        <caption>List of latest weather forecasts.</caption>
        <TableHead aria-label="header">
          <TableRow>
            <TableCell align="center">Date</TableCell>
            <TableCell align="center">Temp. (C)</TableCell>
            <TableCell align="center">Temp. (F)</TableCell>
            <TableCell align="left">Summary</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {forecasts.map((forecast: Forecast) => (
            <ForecastItem
              key={forecast.date}
              forecast={forecast}
            ></ForecastItem>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <div className="forecast-list">
      {isLoading
        ? renderLoading()
        : forecasts.length === 0
        ? renderEmpty()
        : renderList()}
    </div>
  );
}

export default ForecastList;
