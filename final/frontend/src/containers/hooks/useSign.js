import { useState, useEffect, createContext, useContext } from "react";
import { message } from "antd";
import { Alert } from "@mui/material";
import { useQuery, useMutation, useLazyQuery } from "@apollo/client";
import { CREATE_ACCOUNT_MUTATION, SIGN_IN_MUTATION } from "../../graphql";

// const client = new WebSocket("ws://localhost:4000");

const useSign = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState({});
  const [alerted, setAlerted] = useState(false);
  const [inHome, setInHome] = useState(false);
  const [name, setName] = useState("test name");
  //   const sendData = async (data) => {
  //     if (client.readyState >= 1) {
  //       console.log(data);
  //       await client.send(JSON.stringify(data));
  //     }
  //   };

  const displayStatus = (s) => {
    if (s.msg) {
      const { type, msg } = s;
      const content = {
        content: msg,
        duration: 0.5,
      };
      switch (type) {
        case "logIn":
          //   setAlerted(false);
          return (
            <Alert variant="outlined" severity="success">
              This is a success alert — check it out!
            </Alert>
          );
          break;
        case "logFail":
          console.log(s);

          return (
            <Alert variant="outlined" severity="error">
              This is an error alert — check it out!
            </Alert>
          );
          break;
        default:
          message.error(content);
          break;
      }
    }
  };
  //   client.onmessage = (byteString) => {
  //     const { data } = byteString;
  //     const [task, payload] = JSON.parse(data);
  //     switch (task) {
  //       case "logIn": {
  //         console.log("log success");
  //         setInHome(true);
  //         setStatus(payload);
  //         break;
  //       }
  //       case "status": {
  //         setAlerted(true);
  //         setStatus(payload);
  //         break;
  //       }
  //       default:
  //         break;
  //     }
  //   };
  //   const sendAccount = (payload) => {
  //     // update messages and status

  //     sendData(["signIn", payload]);
  //     console.log(payload);
  //   };
  //   const signAccount = (payload) => {
  //     console.log(payload);
  //     sendData(["signUp", payload]);

  //     console.log(payload);
  //   };
  const [signAccount] = useMutation(CREATE_ACCOUNT_MUTATION);
  const [sendAccount] = useMutation(SIGN_IN_MUTATION);
  return {
    sendAccount,
    signAccount,
    email,
    setEmail,
    password,
    setPassword,
    displayStatus,
    status,
    alerted,
    setAlerted,
    inHome,
    setInHome,
    name,
    setName,
  };
};

export default useSign;
