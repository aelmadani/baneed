import React from "react";
import "./FacebookBtn.css";

const FacebookBtn = () => {
  return (
    <form action="/auth/facebook">
      <button className="loginBtn loginBtn--facebook">
        Login with Facebook
      </button>
    </form>
  );
};

export default FacebookBtn;
