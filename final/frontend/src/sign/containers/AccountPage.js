import * as React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import HeadBar from "../components/HeadBar";
import Container from "@mui/material/Container";
import MainButton from "../components/MainButton";
import { width } from "@mui/system";
import CssBaseline from "@mui/material/CssBaseline";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
// import Title from "../components/Title";
import useSign from "./hooks/useSign";
import { useEffect } from "react";
// import { useGame } from "./hooks/useGame";
// import HeadBar from "../components/HeadBar";
import Paper from "@mui/material/Paper";
import {
  Chart,
  PieSeries,
  Title,
} from "@devexpress/dx-react-chart-material-ui";
import { Animation } from "@devexpress/dx-react-chart";
import { useGame } from "./hooks/useGame";
import AccountBar from "../components/AccountBar";
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
const AccountPage = ({ changeInHome }) => {
  const { user } = useGame();

  const tmp = user.winlose;
  let wlData = [
    { record: "lose", area: 2 },
    { record: "win", area: 1 },
  ];
  //   useEffect(() => {
  //     for (var i = 0; i < tmp.length; i++) {
  //       if (tmp) {
  //         wlData[0].area += 1;
  //       } else {
  //         wlData[1].area += 1;
  //       }
  //     }
  //   }, [user]);
  const character_img = [
    require("../components/static/lin.JPG"),
    require("../components/static/lhy.JPG"),
    require("../components/static/chris.JPG"),
  ];
  const character_des = ["Good student", "Merchant", "Gambler"];

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline></CssBaseline>
      <AccountBar changeInHome={changeInHome}></AccountBar>
      <div
        style={{
          //   position: "relative",
          display: "flex",
          justifyContent: "space-around",
          marginTop: "10vh",
        }}
      >
        <Paper>
          <Chart data={wlData} children={"win"} style={{ width: "30vw" }}>
            {//<PieSeries valueField="area" argumentField="record" name="record" />
            }
            <Title text={`Win : Lose`} />
            {/* <br />
          <br /> */}
            {/* <Title text="lose" /> */}
            <Animation />
          </Chart>
        </Paper>
        <Card sx={{ maxWidth: "50vw" }}>
          <CardMedia
            sx={{ height: "25vh", width: "30vw" }}
            image={character_img[parseInt(user.character)]}
            title="green iguana"
          />
          <CardContent sx={{ width: "30vw" }}>
            <Typography gutterBottom variant="h4" component="div">
              {user.name}
            </Typography>
            <Typography variant="h6" color="text.secondary">
              account: {user.account}
              <br />
              character: {character_des[user.character]}
            </Typography>
          </CardContent>
          {/* <CardActions>
            <Button size="small">Share</Button>
            <Button size="small">Learn More</Button>
          </CardActions> */}
        </Card>
      </div>
    </ThemeProvider>
  );
};

export default AccountPage;
