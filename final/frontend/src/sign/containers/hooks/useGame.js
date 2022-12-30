import { useState, useEffect, createContext, useContext } from "react";

const useGame = () => {
  const [gameMode, setGameMode] = useState("");
  const [user, setUser] = useState({});
  return {
    gameMode,
    setGameMode,
    user,
    setUser,
  };
};

export default useGame;
