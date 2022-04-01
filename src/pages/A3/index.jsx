import React from "react";
import Robots from "./components/Robots";
import A3_Header from "./components/Header"
import A3_Home from './components/Home'
//Google Dialogflow
var Dialogflow = document.createElement("script");
Dialogflow.type = "text/javascript";
Dialogflow.async = true;
Dialogflow.src = process.env.REACT_APP_DIALOGFLOW;
document.head.appendChild(Dialogflow);

function A3(params) {
  return(
   <div className="A3">
      <A3_Header/>
      <div className="container">
        <A3_Home/>
      </div>
      <Robots/>
   </div>
  )
}

export default A3;
