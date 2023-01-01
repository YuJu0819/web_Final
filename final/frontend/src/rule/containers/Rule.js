import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Pagination } from "@mui/material";
import HeadBar from "../components/HeadBar";
import { useState, ChangeEvent } from "react";
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#000000",
    },

    primary: {
      main: "#272727",
    },
  },
});

const Rule = ({ changeInHome }) => {
  const [page, setPage] = useState(1);
  const page_img = [
    require("../components/static/rule_3.png"),
    require("../components/static/rule_1.png"),
    require("../components/static/rule_2.png"),
  ];
  const handlePage = (e, value) => {
    setPage(value);
  };
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline></CssBaseline>
      <HeadBar changeInHome={changeInHome}></HeadBar>
      <img
        src={page_img[page - 1]}
        style={{ width: "90vw", height: "85vh", marginLeft: "5%" }}
      ></img>
      <Pagination
        count={3}
        page={page}
        onChange={handlePage}
        variant="outlined"
        style={{ marginLeft: "40vw" }}
      />
    </ThemeProvider>
  );
};

export default Rule;
