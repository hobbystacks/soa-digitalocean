import { Box, Container, Link, Typography } from "@mui/material";

function Copyright() {
  return (
    <Typography variant="body2">
      {"Copyright © "}
      <Link color="inherit" href="https://hobbystacks.com/">
        HobbyStacks
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

interface IFooterProps {
  //
}

const Footer = (props: IFooterProps) => {
  return (
    <Box
      component="footer"
      sx={{
        color: "white",
        backgroundColor: "primary.main",
        px: 2,
        py: 3,
        mt: "auto",
        textAlign: "center",
      }}
    >
      <Container
        sx={{
          maxWidth: "sm",
        }}
      >
        <Copyright />
      </Container>
    </Box>
  );
};

export default Footer;
