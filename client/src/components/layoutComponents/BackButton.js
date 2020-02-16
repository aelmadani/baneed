import React, { Component } from "react";
import { withRouter } from "react-router-dom";

export default withRouter(({ history }) => {
  return (
    <button className="btn" onClick={() => history.goBack()}>
      Go Back
    </button>
  );
});
