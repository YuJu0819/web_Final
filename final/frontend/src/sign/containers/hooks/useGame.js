import { useState, useEffect, createContext, useContext } from "react";

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

  return (
    <GameContext.Provider
      value={{
        gameMode,
        setGameMode,
        user,
        setUser,
        roomNum,
        setRoomNum,
      }}
      {...props}
    />
  );
};
const useGame = () => useContext(GameContext);

export { GameProvider, useGame };
