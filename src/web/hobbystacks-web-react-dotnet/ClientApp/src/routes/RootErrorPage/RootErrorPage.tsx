import { Box, Card, CardContent, CardHeader, Typography } from "@mui/material";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";

const RootErrorPage = () => {
  const error = useRouteError();

  let title = "Error";
  let heading = "Unexpected Error";
  let subheader = "Oops! Something went wrong.";
  let message = "We ran into an unexpected error. Please try again soon.";

  if (isRouteErrorResponse(error)) {
    console.error(error.data);

    heading = error.statusText;

    if (error.status === 404) {
      title = "404";
      subheader = "This page cannot be found.";
      message =
        "We looked everywhere, and still couldn't find it! Try using this search box to find what you were looking for.";
    } else if (error.status === 401) {
      title = "401";
      subheader = "You aren't authorized to see this.";
      message = "You aren't authorized to see this.";
    }
  } else if (error instanceof Error) {
    console.error(error.message);
  }

  // Set HTML5 document's title. (Breaks definition of pure components...)
  document.title = `HobbyStacks - ${title}`;

  return (
    <Box
      padding={2}
      minWidth="100%"
      minHeight="100vh"
      justifyContent="center"
      alignItems="center"
      display="flex"
      bgcolor="#fbfbfb"
    >
      <Box
        borderRadius={0}
        textAlign="center"
        boxShadow="0 0 10px rgb(0 0 0 / 30%)"
      >
        <Card>
          <CardHeader
            title={
              <Typography variant="h1" padding={0}>
                {heading}
              </Typography>
            }
            subheader={<Typography variant="subtitle1">{subheader}</Typography>}
          />
          <CardContent>
            <Typography variant="body1">{message}</Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default RootErrorPage;
