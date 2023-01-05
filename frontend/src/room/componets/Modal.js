/****************************************************************************
  FileName      [ Modal.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the Modal component. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import "./Modal.css";
import React, { useEffect, useState } from "react";
import { useRoom } from "../containers/hooks/useRoom";
import { resetApolloContext } from "@apollo/client";

export default function Modal({ changeInHome, win }) {
  const { Reset} = useRoom();
  const [str1, setStr1] = useState("Gameover");
  const [str2, setStr2] = useState("Back to Home");
  useEffect(() => {
    if (win === 0) {
      setStr1("Tie!");
    } else if (win === 1) {
      setStr1("You Win!");
    } else if (win === 2) {
      setStr1(" You Lose!");
    }
  });
  //   const onBack = ()=>{
  //     changeInHome()

  //   }
  const backAndReset = () => {
    changeInHome();
    Reset();
  };

  return (
    <div className="modal" style={{ visibility: "visible" }}>
      <div className="modalWrapper" />
      <div className="modalContent">
        <div className="modalResult">{str1}</div>
        <div className="modalBtnWrapper">
          <div className="modalBtn" onClick={backAndReset}>
            {str2}
          </div>
        </div>
      </div>
      <div className="modalWrapper" />
    </div>
  );
}
