import React, { Fragment, Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import "./App.css";

import Landing from "./components/layoutComponents/Landing";
import Navbar from "./components/layoutComponents/Navbar";
import Footer from "./components/layoutComponents/Footer";

import Routes from "./routing/Routes";

import * as actions from "./actions";

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
            <Route component={Routes} />
            <Footer />
          </Fragment>
        </Router>
      </div>
    );
  }
}
export default connect(null, actions)(App);
