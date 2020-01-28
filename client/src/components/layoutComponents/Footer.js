import React, { Component } from "react";
import { Link } from "react-router-dom";
import M from "materialize-css";
import { connect } from "react-redux";

class Footer extends Component {
  renderContent() {
    if (this.props.auth) {
      return (
        <div class="fixed-action-btn">
          <a class="btn-floating btn-large orange accent-3">
            <i class="large material-icons">favorite</i>
          </a>
        </div>
      );
    }
  }
  render() {
    document.addEventListener("DOMContentLoaded", function() {
      var elems = document.querySelectorAll(".sidenav");
      var instances = M.Sidenav.init(elems);
    });

    return <div>{this.renderContent()}</div>;
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Footer);
