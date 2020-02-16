import React, { useEffect, useState, Component } from "react";
import { connect } from "react-redux";
import { search, addToFavList } from "../../actions/index";
import { Link } from "react-router-dom";
import cars from "../../data/cars.json";
import axios from "axios";
import CarList from "../layoutComponents/CarList/CarList";

class Favorites extends Component {
  state = {
    favorites: []
  };

  componentDidMount() {
    axios.get("/api/favorites").then((res) => {
      const favs = res.data;
      this.setState({ favorites: favs });
    });
  }

  render() {
    const data = this.state.favorites;

    return <CarList data={data} title="Favorites" showFav />;
  }
}

const mapStateToProps = (state) => ({
  car: state.car
  // auth: state.auth
});

export default connect(mapStateToProps)(Favorites);
