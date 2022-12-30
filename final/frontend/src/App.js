import "./App.css";
import { useState } from "react";

import SignIn from "./sign/containers/settings/SignIn";
import SignUp from "./sign/containers/settings/SignUp";
import useSign from "./sign/containers/hooks/useSign";
import HomePage from "./sign/containers/HomePage";

import CardPage from "./card/containers/CardPage";

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

  const changeSignUp = () => {
    setSignUp((current) => !current);
  };
  const changeInHome = () => {
    setInHome((current) => !current);
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

  //For test room at 12/30 02:05

  // return (
  //   <RoomProvider>
  //     <RoomPage/>
  //   </RoomProvider>
  // );

  //For test room at 12/30 02:05

  if (inHome) {
    return (
      <HomePage
        changeInHome={changeInHome}
        set_Card={set_Card}
        set_Rule={set_Rule}
        set_Room={set_Room}
      ></HomePage>
    );
  } else if (inCard) {
    return <CardPage changeInHome={changeInHome} />;
  } else if (inRoom) {
    return (
      <RoomProvider>
        <RoomPage />
      </RoomProvider>
    );
  } else if (!signUp) {
    console.log("signinPage");
    return (
      <SignIn
        changeSignUp={changeSignUp}
        changeInHome={changeInHome}
        set_Name={set_Name}
      ></SignIn>
    );
  } else {
    console.log("signupPage");
    return <SignUp changeSignUp={changeSignUp}></SignUp>;
  }
}

export default App;
