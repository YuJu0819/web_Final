import { useState, useEffect, createContext, useContext } from "react";
import {
  CREATE_ROOM_MUTATION,
  ROOM_QUERY,
  ADD_ROOM_TO_USER,
  ADD_USER_TO_ROOM,
} from "../../../graphql";
import { useQuery, useMutation, useLazyQuery } from "@apollo/client";
const GameContext = createContext({
  gameMode: "",
  user: {},
  setUser: () => {},
  setGameMode: () => {},
});
const GameProvider = (props) => {
  const [gameMode, setGameMode] = useState("");
  const [user, setUser] = useState({});
  const [roomNum, setRoomNum] = useState();
  const [createRoom] = useMutation(CREATE_ROOM_MUTATION);
  const [addRoomToUser] = useMutation(ADD_ROOM_TO_USER);
  const [addUserToRoom] = useMutation(ADD_USER_TO_ROOM);
  const [getRoom, { data, loading, subscribeToMore }] =
    useLazyQuery(ROOM_QUERY);
  return (
    <GameContext.Provider
      value={{
        gameMode,
        setGameMode,
        user,
        setUser,
        roomNum,
        setRoomNum,
        createRoom,
        getRoom,
        data,
        addRoomToUser,
        addUserToRoom,
      }}
      {...props}
    />
  );
};
const useGame = () => useContext(GameContext);

export { GameProvider, useGame };
