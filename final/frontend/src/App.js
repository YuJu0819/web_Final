import logo from "./logo.svg";
import "./App.css";
import SignIn from "./containers/settings/SignIn";
import { useState } from "react";
import SignUp from "./containers/settings/SignUp";
import useSign from "./containers/hooks/useSign";
import HomePage from "./containers/HomePage";
import { CardProvider } from "./containers/hooks/useCard";
import CardPage from "./containers/CardPage";
function App() {
  const [signUp, setSignUp] = useState(false);
  const { inHome, setInHome, inCard, setInCard, inRule, setInRule, setName } =
    useSign();
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
  };
  const set_Rule = () => {
    setInRule(true);
    setInHome(false);
    setInCard(false);
  };
  const set_Name = (tmp) => {
    setName(tmp);
  };
  if (inHome) {
    return (
      <HomePage
        changeInHome={changeInHome}
        set_Card={set_Card}
        set_Rule={set_Rule}
      ></HomePage>
    );
  } else if (inCard) {
    return (
      <CardProvider>
        <CardPage></CardPage>
      </CardProvider>
    );
  } else if (!signUp)
    return (
      <SignIn
        changeSignUp={changeSignUp}
        changeInHome={changeInHome}
        set_Name={set_Name}
      ></SignIn>
    );
  else {
    return <SignUp changeSignUp={changeSignUp}></SignUp>;
  }
}

export default App;
