import React, { useEffect, useState, Component } from "react";
import { connect } from "react-redux";
import { search, addToFavList } from "../../actions/index";
import { Link } from "react-router-dom";
import cars from "../../data/cars.json";
import CarList from "../layoutComponents/CarList/CarList";

class Cars extends Component {
  // state = {
  //   currentSort: "upPrice"
  // };

  componentDidMount() {
    const query = this.props.location.search;
    this.props.search(query);
  }

  render() {
    const data = this.props.car.cars;

    return <CarList data={data} title="Search Results" showFav />;
  }
}

const mapStateToProps = (state) => ({
  car: state.car
  // auth: state.auth
});

export default connect(mapStateToProps, { search })(Cars);
