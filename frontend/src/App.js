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
import AccountPage from "./sign/containers/AccountPage";

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
    inAccount,
    setInAccount,
  } = useSign();
  const { user, setUser } = useGame();

  const changeSignUp = () => {
    setSignUp((current) => !current);
    setInCard(false);
    setInHome(false);
    setInRule(false);
    setInRoom(false);
    setInAccount(false);
  };
  const changeInHome = (data) => {
    setInHome((current) => !current);
    setInCard(false);
    setInRule(false);
    setInRoom(false);
    setInAccount(false);
    // console.log(data);
    setUser(data);
  };

  const set_Card = () => {
    console.log(inCard, inHome);
    setInCard(true);
    setInHome(false);
    setInRule(false);
    setInRoom(false);
    setInAccount(false);
  };
  const set_Rule = () => {
    setInRule(true);
    setInHome(false);
    setInCard(false);
    setInRoom(false);
    setInAccount(false);
  };
  const set_Room = () => {
    setInRoom(true);
    setInHome(false);
    setInCard(false);
    setInRule(false);
    setInAccount(false);
  };

  const set_Name = (tmp) => {
    setName(tmp);
  };
  const set_User = (account, name) => {
    setUser({ account: account, name: name });
  };
  const set_Account = () => {
    setInRoom(false);
    setInHome(false);
    setInCard(false);
    setInRule(false);
    setInAccount(true);
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
        <RoomProvider>
          <HomePage
            changeInHome={changeInHome}
            set_Card={set_Card}
            set_Rule={set_Rule}
            set_Room={set_Room}
            set_Account={set_Account}
            user={user}
          ></HomePage>
        </RoomProvider>
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
          <RoomPage changeInHome={changeInHome} />
        </RoomProvider>
      </GameProvider>
    );
  } else if (inRule) {
    return (
      <GameProvider>
        <Rule changeInHome={changeInHome}></Rule>
      </GameProvider>
    );
  } else if (inAccount) {
    return (
      <GameProvider>
        <AccountPage changeInHome={changeInHome}></AccountPage>
      </GameProvider>
    );
  } else if (!signUp) {
    //console.log("signinPage");
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
