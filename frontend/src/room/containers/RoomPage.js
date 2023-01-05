import Board from "./Board";
import { useRoom } from "./hooks/useRoom";
import { useEffect, useState } from "react";
import {
  USERS_IN_ROOM_SUBSCRIPTION,
  ROOM_QUERY,
  DELETE_ROOM_MUTATION,
} from "../../graphql";
import { useMutation } from "@apollo/client";
import { useQuery } from "@apollo/client";
import { useGame } from "../../sign/containers/hooks/useGame";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Modal from "../componets/Modal";
import HeadBarRoom from "../componets/HeadBarRoom";
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

var UnSub = () => {};

function Room({ changeInHome }) {
  const { startGame, win, open } = useRoom();

  const { roomNum, user } = useGame();
  const [ifStart, setIfStart] = useState(false);
  const [deleteRoom] = useMutation(DELETE_ROOM_MUTATION);
  const { data, subscribeToMore, refetch } = useQuery(ROOM_QUERY, {
    variables: { id: roomNum },
  });

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
  };

  if (!ifStart) {
    return (
      <ThemeProvider theme={darkTheme}>
        <CssBaseline></CssBaseline>
        <HeadBarRoom
          changeInHome={changeInHome}
          deleteRoom={deleteRoom}
          roomID={roomNum}
        ></HeadBarRoom>
        <div className="font_select">Room ID: {roomNum}</div>
        <br />
        <br />
        <br />
        <div className="font_select">waiting for oponent...</div>
      </ThemeProvider>
    );
  } else if (open) {
    //console.log("you win !!!");
    return (
      <>
        <Board></Board>
        <Modal changeInHome={changeInHome} win={win}></Modal>
      </>
    );
  } else {
    return <Board></Board>;
  }
}

export default Room;
