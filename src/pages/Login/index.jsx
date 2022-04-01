import React from "react";
import { useState, useEffect } from "react";
import LoginPage from "./components/LoginPage";

const Login = ({ AccessToken }) => {
  return (
    <div className="Outline">
      <LoginPage AccessToken={AccessToken} />
    </div>
  );
};

export default Login;
