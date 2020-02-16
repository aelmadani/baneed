import React, { useEffect, useState, Component } from "react";
import { connect } from "react-redux";
import { addToFavList } from "../../../actions/index";
import { Link } from "react-router-dom";
import cars from "../../../data/cars.json";

const cities = [
  { value: "cph", name: "Copenhagen" },
  { value: "aarhus", name: "Århus" },
  { value: "odense", name: "Odense" }
];

const sortTypes = {
  upDate: {
    fn: (a, b) => {
      if (a.dateCreated < b.dateCreated) return -1;
      if (a.dateCreated > b.dateCreated) return 1;
      return 0;
    }
  },
  downDate: {
    fn: (a, b) => {
      if (a.dateCreated < b.dateCreated) return 1;
      if (a.dateCreated > b.dateCreated) return -1;
      return 0;
    }
  },
  upMake: {
    fn: (a, b) => {
      if (a.make < b.make) return -1;
      if (a.make > b.make) return 1;
      return 0;
    }
  },
  downMake: {
    fn: (a, b) => {
      if (a.make < b.make) return 1;
      if (a.make > b.make) return -1;
      return 0;
    }
  },
  upYear: {
    fn: (a, b) => a.year - b.year
  },
  downYear: {
    fn: (a, b) => b.year - a.year
  },
  upPrice: {
    fn: (a, b) => a.price - b.price
  },
  downPrice: {
    fn: (a, b) => b.price - a.price
  },

  default: {
    fn: (a, b) => a
  }
};

class CarList extends Component {
  state = {
    currentSort: "upPrice"
  };

  onSortChange = (type) => {
    const { currentSort } = this.state;
    console.log("type: " + type);
    console.log("state: " + this.state.currentSort);

    if (type === "make" && currentSort === "upMake")
      this.setState({ currentSort: "downMake" });
    if (type === "make" && currentSort !== "upMake")
      this.setState({ currentSort: "upMake" });

    if (type === "year" && currentSort === "upYear")
      this.setState({ currentSort: "downYear" });
    if (type === "year" && currentSort !== "upYear")
      this.setState({ currentSort: "upYear" });

    if (type === "price" && currentSort === "upPrice") {
      this.setState({ currentSort: "downPrice" });
    }
    if (type === "price" && currentSort !== "upPrice")
      this.setState({ currentSort: "upPrice" });

    if (type === "date" && currentSort === "upDate")
      this.setState({ currentSort: "downDate" });
    if (type === "date" && currentSort !== "upDate")
      this.setState({ currentSort: "upDate" });
  };
  renderFavTop() {
    if (this.props.auth) {
      return <div className="cell fav"></div>;
    }
  }

  renderFavCell(carId) {
    if (this.props.auth && this.props.showFav) {
      if (this.props.auth.favList.includes(carId)) {
        return (
          <i
            onClick={() => this.handleFav(carId)}
            class="material-icons orange-text text-accent-3 favcell "
          >
            favorite
          </i>
        );
      } else {
        return (
          <i
            onClick={() => this.handleFav(carId)}
            class="material-icons orange-text text-accent-3 favcell"
          >
            favorite_border
          </i>
        );
      }
    }
  }
  handleFav(id) {
    this.props.addToFavList(id);
  }

  render() {
    const data = this.props.data;
    const { currentSort } = this.state;
    console.log(data);
    const newData = data.sort((a, b) =>
      a.year > b.year ? 1 : b.year > a.year ? -1 : 0
    );
    console.log(newData);

    return (
      data.length > 0 && (
        <div className="container-table100">
          <h5>{this.props.title}</h5>
          <div className="wrap-table100">
            <div className="table">
              <div className="row header">
                <div className="cell" onClick={() => this.onSortChange("date")}>
                  Date
                </div>
                <div className="cell" onClick={() => this.onSortChange("make")}>
                  Make
                </div>
                <div className="cell" onClick={() => this.onSortChange("year")}>
                  Year
                </div>
                <div
                  className="cell"
                  onClick={() => this.onSortChange("price")}
                >
                  Price
                </div>
                {this.renderFavTop()}
              </div>

              {[...data].sort(sortTypes[currentSort].fn).map((p) => (
                <div to={`/car/${p._id}`} className="row">
                  <Link
                    to={`/car/${p._id}`}
                    className="cell "
                    data-title="date"
                  >
                    <img alt="" src={p.imageLinks[0]}></img>
                  </Link>
                  <Link to={`/car/${p._id}`} className="cell" data-title="make">
                    {cars.find((car) => car.value === p.make).name}{" "}
                    {cars.find((car) => car.value === p.model).name} {p.trim}
                  </Link>
                  <Link to={`/car/${p._id}`} className="cell" data-title="year">
                    {p.year}
                  </Link>
                  <Link
                    to={`/car/${p._id}`}
                    className="cell"
                    data-title="price"
                  >
                    {p.price} DKK
                  </Link>
                  {this.renderFavCell(p._id)}
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    );
  }
}

const mapStateToProps = (state) => ({
  // car: state.car,
  auth: state.auth
});

export default connect(mapStateToProps, { addToFavList })(CarList);
