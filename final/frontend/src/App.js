import "./App.css";
import { useEffect, useState } from "react";

import SignIn from "./sign/containers/settings/SignIn";
import SignUp from "./sign/containers/settings/SignUp";
import useSign from "./sign/containers/hooks/useSign";
import HomePage from "./sign/containers/HomePage";
import Rule from "./rule/containers/Rule";
import CardPage from "./card/containers/CardPage";
import { GameProvider, useGame } from "./sign/containers/hooks/useGame";

import { RoomProvider } from "./room/containers/hooks/useRoom";
import RoomPage from "./room/containers/RoomPage";

function App() {
  const [signUp, setSignUp] = useState(false);
  const {
    inHome,
    setInHome,
    inCard,
    setInCard,
    inRule,
    setInRule,
    setName,
    setInRoom,
    inRoom,
  } = useSign();
  const { user, setUser } = useGame();

  const changeSignUp = () => {
    setSignUp((current) => !current);
    setInCard(false);
    setInHome(false);
    setInRule(false);
    setInRoom(false);
  };
  const changeInHome = (data) => {
    setInHome((current) => !current);
    setInCard(false);
    setInRule(false);
    setInRoom(false);

    // console.log(data);
    setUser(data);
  };

  const set_Card = () => {
    console.log(inCard, inHome);
    setInCard(true);
    setInHome(false);
    setInRule(false);
    setInRoom(false);
  };
  const set_Rule = () => {
    setInRule(true);
    setInHome(false);
    setInCard(false);
    setInRoom(false);
  };
  const set_Room = () => {
    setInRoom(true);
    setInHome(false);
    setInCard(false);
    setInRule(false);
  };

  const set_Name = (tmp) => {
    setName(tmp);
  };
  const set_User = (account, name) => {
    setUser({ account: account, name: name });
  };

  //For test room at 12/30 02:05

  // return (
  //   <RoomProvider>
  //     <RoomPage/>
  //   </RoomProvider>
  // );

  //For test room at 12/30 02:05

  if (inHome) {
    return (
      <GameProvider>
        <HomePage
          changeInHome={changeInHome}
          set_Card={set_Card}
          set_Rule={set_Rule}
          set_Room={set_Room}
          user={user}
        ></HomePage>
      </GameProvider>
    );
  } else if (inCard) {
    return (
      <GameProvider>
        <CardPage changeInHome={changeInHome} />
      </GameProvider>
    );
  } else if (inRoom) {
    return (
      <GameProvider>
        <RoomProvider>
          <RoomPage />
        </RoomProvider>
      </GameProvider>
    );
  } else if (inRule) {
    return <Rule changeInHome={changeInHome}></Rule>;
  } else if (!signUp) {
    console.log("signinPage");
    return (
      <GameProvider>
        <SignIn
          changeSignUp={changeSignUp}
          changeInHome={changeInHome}
          set_Name={set_Name}
          set_User={set_User}
        ></SignIn>
      </GameProvider>
    );
  } else {
    console.log("signupPage");
    return <SignUp changeSignUp={changeSignUp}></SignUp>;
  }
}

export default App;
