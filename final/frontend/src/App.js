import logo from "./logo.svg";
import "./App.css";
import SignIn from "./containers/SignIn";
import { useState } from "react";
import SignUp from "./containers/SignUp";
function App() {
  const [signUp, setSignUp] = useState(false);

  const changeSignUp = () => {
    setSignUp((current) => !current);
  };
  if (!signUp) return <SignIn changeSignUp={changeSignUp}></SignIn>;
  else {
    return <SignUp changeSignUp={changeSignUp}></SignUp>;
  }
}

export default App;
