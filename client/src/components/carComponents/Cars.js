import React, { useEffect, useState, Component } from "react";
import { connect } from "react-redux";
import { search } from "../../actions/index";
import { Link } from "react-router-dom";
import cars from "../../data/cars.json";

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

class Cars extends Component {
  state = {
    currentSort: "upPrice"
  };

  componentDidMount() {
    const query = this.props.location.search;
    this.props.search(query);
  }

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
      console.log("here");
      this.setState({ currentSort: "downPrice" });
    }
    if (type === "price" && currentSort !== "upPrice")
      this.setState({ currentSort: "upPrice" });

    if (type === "date" && currentSort === "upDate")
      this.setState({ currentSort: "downDate" });
    if (type === "date" && currentSort !== "upDate")
      this.setState({ currentSort: "upDate" });
  };

  render() {
    const data = this.props.car.cars;
    const { currentSort } = this.state;
    console.log(data);
    const newData = data.sort((a, b) =>
      a.year > b.year ? 1 : b.year > a.year ? -1 : 0
    );
    console.log(newData);

    return (
      data.length > 0 && (
        <table className="text-left">
          <thead>
            <tr>
              <th>
                <button onClick={() => this.onSortChange("date")}>Date</button>
              </th>
              <th>
                <button onClick={() => this.onSortChange("make")}>
                  Make
                  {/* <i className={`fas fa-${sortTypes[currentSort].class}`}></i> */}
                </button>
              </th>
              <th>
                <button onClick={() => this.onSortChange("year")}>
                  Year
                  {/* <i className={`fas fa-${sortTypes[currentSort].class}`}></i> */}
                </button>
              </th>
              <th>
                <button onClick={() => this.onSortChange("price")}>
                  Price
                  {/* <i className={`fas fa-${sortTypes[currentSort].class}`}></i> */}
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {[...data].sort(sortTypes[currentSort].fn).map((p) => (
              <tr>
                <td>
                  <div className="list-image">
                    <img alt="" src={p.imageLinks[0]}></img>
                  </div>
                </td>
                <td>
                  {p.make} {p.model}
                </td>
                <td>{p.year}</td>
                <td>{p.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )
    );
  }
}

const mapStateToProps = (state) => ({
  car: state.car
});

export default connect(mapStateToProps, { search })(Cars);
