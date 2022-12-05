import logo from "./logo.svg";
import "./App.css";
import SignIn from "./containers/SignIn";
import { useState } from "react";
import SignUp from "./containers/SignUp";
import useSign from "./containers/hooks/useSign";
import HomePage from "./containers/HomePage";
function App() {
  const [signUp, setSignUp] = useState(false);
  const { inHome, setInHome } = useSign();
  const changeSignUp = () => {
    setSignUp((current) => !current);
  };
  const changeInHome = () => {
    setInHome((current) => !current);
  };

  if (inHome) {
    return <HomePage changeInHome={changeInHome}></HomePage>;
  } else if (!signUp)
    return (
      <SignIn changeSignUp={changeSignUp} changeInHome={changeInHome}></SignIn>
    );
  else {
    return <SignUp changeSignUp={changeSignUp}></SignUp>;
  }
}

export default App;
