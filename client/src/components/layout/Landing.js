import React from "react";
//import { Link, Redirect } from "react-router-dom";
import SimpleSearch from "../search/SimpleSearch";

import { connect } from "react-redux";

const Landing = (props) => {
  return (
    <div className="container">
      <SimpleSearch />
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Landing);
