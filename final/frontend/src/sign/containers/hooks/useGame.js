import { useState, useEffect, createContext, useContext } from 'react';

const GameContext = createContext({
  gameMode: '',
  user: {},
  setUser: () => {},
  setGameMode: () => {},
});
const GameProvider = (props) => {
  const [gameMode, setGameMode] = useState('');
  const [user, setUser] = useState({});

  return (
    <GameContext.Provider
      value={{
        gameMode,
        setGameMode,
        user,
        setUser,
      }}
      {...props}
    />
  );
};
const useGame = () => useContext(GameContext);

export { GameProvider, useGame };
