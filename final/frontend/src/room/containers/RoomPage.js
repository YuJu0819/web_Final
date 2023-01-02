import Board from "./Board";
import { useRoom } from "./hooks/useRoom";
import { useEffect, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import { useGame } from "../../sign/containers/hooks/useGame";
import { GAME_SUBSCRIPTION } from "../../graphql/";
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
function Room() {
  const { startGame } = useRoom();
  const { getRoom, data, roomNum, user, subscribeToMore } = useGame();
  const [ifStart, setIfStart] = useState(false);
  const start = () => {
    startGame(23, 11, [19, 5], [3, 5]);
    setIfStart(true);
  };

  //   useEffect(() => {
  //     const searchRoom = async () => {
  //       let tmp = await getRoom({
  //         variables: {
  //           id: roomNum,
  //         },
  //       });
  //       console.log(tmp.data.room, roomNum);
  //       if (tmp.data.room && tmp.data.room.users.length === 1) {
  //         console.log("success");
  //         start();
  //         return true;
  //       }
  //       return false;
  //     };
  //     const room = searchRoom();

  //     // console.log(room);
  //   }, []);

  useEffect(() => {
    subscribeToMore({
      document: GAME_SUBSCRIPTION,
      variables: { roomID: roomNum, user1: user.account },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        if (subscriptionData.data.room.users.length === 2) {
          start();
        }
        return subscriptionData.data.room;
      },
    });
  });
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
