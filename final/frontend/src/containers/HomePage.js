import * as React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import HeadBar from "../components/HeadBar";
import Container from "@mui/material/Container";
import MainButton from "../components/MainButton";
import { width } from "@mui/system";
import CssBaseline from "@mui/material/CssBaseline";
import Title from "../components/Title";
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
const HomePage = ({ changeInHome }) => {
  //   const theme = createTheme();

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <main style={{ height: "100vh", width: "100vw" }}>
        <HeadBar changeInHome={changeInHome}></HeadBar>
        <Container
          component="main"
          maxWidth="100vw"
          //   sx={{ bgcolor: "#3C3C3C", height: 1 }}
        >
          <Title></Title>
          <MainButton></MainButton>
        </Container>
      </main>
    </ThemeProvider>
  );
};
export default HomePage;
