import CardBench from "../components/CardBench";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, Container, Fab } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useEffect, useState } from "react";
import useSign from "../../sign/containers/hooks/useSign";
import { useLazyQuery, useQuery } from "@apollo/client";
import { CARDS_QUERY } from "../../graphql/query";
import { useGame } from "../../sign/containers/hooks/useGame";
import HeadBar from "../components/HeadBar";

const CardPage = ({ changeInHome }) => {
  const { user } = useGame();
  let cards = [];
  console.log(user);
  const { data } = useQuery(CARDS_QUERY, {
    variables: { character: user ? user.character : "" },
  });
  if (data) {
    cards = data.cards;
  }
  console.log(cards);
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
          width: "100vw",
          height: "95vh",
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        <HeadBar changeInHome={changeInHome}></HeadBar>
        <CardBench cards={cards}/>
      </Box>
    </ThemeProvider>
  );
};

export default CardPage;
