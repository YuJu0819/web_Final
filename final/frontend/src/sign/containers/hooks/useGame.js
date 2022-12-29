import { useState, useEffect, createContext, useContext } from "react";

const useGame = () => {
  const [gameMode, setGameMode] = useState("");

  return {
    gameMode,
    setGameMode,
  };
};

export default useGame;
