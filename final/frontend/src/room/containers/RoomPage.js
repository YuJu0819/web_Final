import Board from "./Board";
import { useRoom } from "./hooks/useRoom";
import { useEffect, useState } from "react";
import { USERS_IN_ROOM_SUBSCRIPTION, ROOM_QUERY } from "../../graphql";
import { useQuery } from "@apollo/client";
import { useGame } from "../../sign/containers/hooks/useGame";
// import { useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
// import { useGame } from "../../sign/containers/hooks/useGame";
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
function Room() {
  const { startGame } = useRoom();
  const { roomNum } = useGame();
  const [ifStart, setIfStart] = useState(false);
  const { data, subscribeToMore, refetch } = useQuery(ROOM_QUERY, {
    variables: { id: roomNum },
  });
  console.log(data);
  console.log(roomNum);
  useEffect(() => {
    refetch();
    subscribeToMore({
      document: USERS_IN_ROOM_SUBSCRIPTION,
      variables: { roomId: roomNum },
      updateQuery: (prev, { subscriptionData }) => {
        if (subscriptionData) {
          //   setIfStart(subscriptionData.data)
          start();
        }
        return prev;
      },
    });
  }, [subscribeToMore]);
  const start = () => {
    startGame(23, 11, [19, 5], [3, 5]);
    setIfStart(true);
  };

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
