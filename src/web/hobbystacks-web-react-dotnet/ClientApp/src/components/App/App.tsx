import { Box } from "@mui/material";
import Footer from "layout/Footer/Footer";
import Header from "layout/Header/Header";
import Main from "layout/Main/Main";
import { Outlet } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Header />
      <Main>
        <Outlet />
      </Main>
      <Footer />
    </Box>
  );
}

export default App;
