import { useState, useEffect, createContext, useContext } from "react";

const CardContext = createContext({
  drawerStatus: false,
  removeStatus: false,
  cards: [],
  setDrawer: () => {},
  setRemove: () => {},
});

const CardProvider = (props) => {
  const arr = Array(15).fill(0);
  const [drawerStatus, setdrawerStatus] = useState(false);
  const [removeStatus, setRemoveStatus] = useState(false);
  const [cards, setCards] = useState(arr);

  const setDrawer = () => {
    setdrawerStatus(() => !drawerStatus);
    console.log(drawerStatus);
    console.log(cards);
    console.log("haha!");
  };
  const setRemove = () => {
    console.log("gogo!");
    setRemoveStatus(() => !removeStatus);
  };

  return (
    <CardContext.Provider
      value={{ drawerStatus, removeStatus, setRemove, setDrawer, cards }}
      {...props}
    />
  );
};

const useCard = () => useContext(CardContext);
export { useCard, CardProvider };
