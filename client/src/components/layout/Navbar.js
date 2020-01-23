import React, { Component } from "react";
import { Link } from "react-router-dom";
import M from "materialize-css";
import { connect } from "react-redux";

class Navbar extends Component {
  renderContent() {
    if (this.props.auth) {
      return [
        <li key="1">
          <Link to="/search">Search</Link>
        </li>,
        <li key="2">
          <Link to="/newcar">Sell your car</Link>
        </li>,
        <li key="3">
          <Link to="/favorites">My Favorites</Link>
        </li>,
        <li key="4" style={{ margin: "0 10px" }}>
          <Link to={"/profile"}>{this.props.auth.firstName}</Link>
        </li>,
        <li key="5">
          <a href="/api/logout">Logout</a>
        </li>
      ];
    } else {
      return [
        <li key="6" className="sidenav-links">
          <Link to="/search">Search</Link>
        </li>,
        <li key="7" className="sidenav-links">
          <Link to="/login">Login</Link>
        </li>
      ];
    }
  }

  render() {
    document.addEventListener("DOMContentLoaded", function() {
      var elems = document.querySelectorAll(".sidenav");
      var instances = M.Sidenav.init(elems);
    });
    return (
      <div>
        <div className="navbar-fixed">
          <nav className="orange accent-3">
            <div className="nav-wrapper">
              <a href="/#" className="brand-logo">
                Baneed.com
              </a>
              <a href="#" data-target="mobile-demo" class="sidenav-trigger">
                <i class="material-icons">menu</i>
              </a>
              <ul id="nav-mobile" className="right hide-on-med-and-down">
                {this.renderContent()}
              </ul>
            </div>
          </nav>
        </div>

        <ul class="sidenav sidenav-close" id="mobile-demo">
          {this.renderContent()}
        </ul>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Navbar);
