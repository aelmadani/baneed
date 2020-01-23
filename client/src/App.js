import React, { Fragment, Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import "./App.css";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

import Landing from "./components/layout/Landing";
import Login from "./components/Login";
import Register from "./components/Register";
import CarForm from "./components/newCar/CarForm";
import Search from "./components/Search";

import * as actions from "./actions";

import Alert from "./components/layout/Alert";
import Cars from "./Cars";
import Car from "./Car";

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div>
        <Router>
          <Fragment>
            <Navbar />
            <Route exact path="/" component={Landing} />
            <section className="container">
              <Alert />
              <Switch>
                {/* <Route exact path="/login" component={Login} /> */}
                <Route exact path="/register" component={Register} />
                {/* <Route exact path="/dashboard" component={Dashboard} /> */}
                <Route exact path="/login" component={Login} />
                <Route path="/search" component={Search} />
                <Route exact path="/cars" component={Cars} />
                <Route exact path="/car/:id" component={Car} />
                <Route exact path="/newcar" component={CarForm} />
              </Switch>
            </section>
            <Footer />
          </Fragment>
        </Router>
      </div>
    );
  }
}
export default connect(null, actions)(App);
