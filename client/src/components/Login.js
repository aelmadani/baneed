import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";

import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import FacebookBtn from "./layout/FacebookBtn/FacebookBtn";
import { connect } from "react-redux";
import { setAlert } from "../actions/alert";

const Login = (props) => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    props.login(email, password);
  };

  // Redirect when logged in
  if (props.auth) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Fragment>
      <h1 className="large text-primary">Login</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Login to Your Account
      </p>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
            // required
          />
          <small className="form-text"></small>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => onChange(e)}
            // minLength="6"
          />
        </div>

        <input
          disabled
          type="submit"
          className="btn btn-primary"
          value="Login"
        />
      </form>
      <p className="my-1">
        Dont have an account? <Link to="/register">Register</Link>
      </p>
      <FacebookBtn />
    </Fragment>
  );
};

Login.propTypes = {
  setAlert: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  auth: PropTypes.object
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { setAlert })(Login);
