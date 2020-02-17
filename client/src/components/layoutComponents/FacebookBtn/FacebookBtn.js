import React from "react";
const config = require("config");

import { Link } from "react-router-dom";

import "./FacebookBtn.css";

const FacebookBtn = () => {
  return (
    <form action={config.get("facebookAuthUrl")}>
      <button className="loginBtn loginBtn--facebook">
        Login with Facebook
      </button>
    </form>
  );
};

export default FacebookBtn;
