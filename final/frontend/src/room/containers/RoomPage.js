import Board from "./Board";
import { useRoom } from "./hooks/useRoom";
import { useEffect, useState } from "react";
import { USERS_IN_ROOM_SUBSCRIPTION, ROOM_QUERY } from "../../graphql";
import { useQuery } from "@apollo/client";
import { useGame } from "../../sign/containers/hooks/useGame";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

var UnSub = () => {};

function Room() {

  const { startGame } = useRoom();
  const { roomNum, user } = useGame();
  const [ifStart, setIfStart] = useState(false);
  const { data, subscribeToMore, refetch } = useQuery(ROOM_QUERY, {
    variables: { id: roomNum },
  });
  //console.log(data);
  //console.log(roomNum);

  useEffect(() => {
    refetch();
    UnSub();
    UnSub = subscribeToMore({
      document: USERS_IN_ROOM_SUBSCRIPTION,
      variables: { roomId: roomNum },
      updateQuery: (prev, { subscriptionData }) => {
        if (subscriptionData) {
          //   setIfStart(subscriptionData.data)
          console.log(subscriptionData);
          console.log("start game");
          start();
        }
        return prev;
      },
    });
  }, [subscribeToMore]);

  const start = () => {
    startGame(roomNum, user);
    setIfStart(true);
  }

  if (!ifStart)
    return (
      <ThemeProvider theme={darkTheme}>
        <CssBaseline></CssBaseline>
        <div className="font_select">Room ID: {roomNum}</div>
        <br />
        <br />
        <br />
        <div className="font_select">waiting for oponent...</div>
      </ThemeProvider>
    );
  else {
    return <Board></Board>;
  }
}

export default Room;
