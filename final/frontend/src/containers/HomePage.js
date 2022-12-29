import * as React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import HeadBar from "../components/HeadBar";
import Container from "@mui/material/Container";
import MainButton from "../components/MainButton";
import { width } from "@mui/system";
import CssBaseline from "@mui/material/CssBaseline";
import Title from "../components/Title";
import useSign from "./hooks/useSign";
import { useEffect } from "react";
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
const HomePage = ({ changeInHome, set_Card }) => {
  //   const theme = createTheme();
  const { data, getAccount, inHome, email, setName, set_Name, name } =
    useSign();
  useEffect(() => {
    console.log(name);
    getAccount({ variables: { account: email } });
    // setName(data.)
    console.log(data);
  }, [inHome]);
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
          <MainButton set_Card={set_Card}></MainButton>
        </Container>
      </main>
    </ThemeProvider>
  );
};
export default HomePage;
