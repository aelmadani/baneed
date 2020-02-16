import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import CarList from "../layoutComponents/CarList/CarList";
import axios from "axios";
import { getUsersCars } from "../../actions/index";

export class Dashboard extends Component {
  state = {
    favorites: []
  };
  componentDidMount() {
    axios.get("/api/favorites").then((res) => {
      const favs = res.data;
      this.setState({ favorites: favs });
    });

    this.props.getUsersCars(this.props.auth._id);
  }
  render() {
    const fav = this.state.favorites;
    const userCars = this.props.car.userCars;

    return (
      <div>
        <div className="mini-table">
          <CarList data={fav} title="Your Favorites" showFav />
        </div>
        <div className="mini-table">
          <CarList data={userCars} title="Your Cars" />
        </div>
        <div>
          <h5>Profile</h5>
          <p>
            Name:{" "}
            <span>
              {this.props.auth.firstName} {this.props.auth.lastName}
            </span>
          </p>
          <p>
            E-mail: <span>{this.props.auth.email}</span>
          </p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  car: state.car,
  auth: state.auth
});

export default connect(mapStateToProps, { getUsersCars })(Dashboard);
