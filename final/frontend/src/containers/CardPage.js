import CardBench from "../components/CardBench";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CachedIcon from "@mui/icons-material/Cached";
import CheckIcon from "@mui/icons-material/Check";
import { Box, Container, Fab } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import CardDrawer from "../components/CardDrawer";
import { useState } from "react";
import { useCard } from "./hooks/useCard";

const CardPage = () => {
  const { drawerStatus, removeStatus, setRemove, setDrawer } = useCard();
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#1976d2",
      },
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box
        sx={{
          margin: "0px",
          width: "97vw",
          height: "96vh",
          display: "flex",
          flexWrap: "wrap",
          overflow: "unset",
        }}
      >
        <Box sx={{ width: "100%" }}>
          <Fab
            size="large"
            color="primary"
            aria-label="arrowBack"
            sx={{
              marginTop: "15px",
              left: "3%",
            }}
          >
            <ArrowBackIcon fontSize="large" />
          </Fab>

          <Fab
            size="large"
            color={removeStatus ? "success" : "primary"}
            aria-label="refresh"
            onClick={setRemove}
            sx={{
              marginTop: "15px",
              left: "88%",
            }}
          >
            {removeStatus ? (
              <CheckIcon fontSize="large" />
            ) : (
              <CachedIcon fontSize="large" />
            )}
          </Fab>
        </Box>
        <CardBench />
        <CardDrawer open={drawerStatus} setDrawer={setDrawer} />
      </Box>
    </ThemeProvider>
  );
};

export default CardPage;
