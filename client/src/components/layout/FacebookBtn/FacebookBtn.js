import React from "react";
import { Link } from "react-router-dom";

import "./FacebookBtn.css";

const FacebookBtn = () => {
  return (
    <form action="http://localhost:5060/auth/facebook">
      <button className="loginBtn loginBtn--facebook">
        Login with Facebook
      </button>
    </form>
  );
};

export default FacebookBtn;
