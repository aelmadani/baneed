import React, { useEffect } from "react";
import { connect } from "react-redux";
import { search } from "./actions/index";
import { Link } from "react-router-dom";

const Cars = (props) => {
  const query = props.location.search;

  useEffect(() => {
    props.search(query);
  }, []);

  return (
    <div>
      <h1>Search Results</h1>
      {props.car.cars.map((item) => (
        <div className="profile bg-light">
          <img alt=""></img>
          <div>
            <h2>
              {item.make} {item.model}{" "}
            </h2>
            <p>
              Registration year: <span>{item.year}</span>
            </p>
            <p>
              City: <span>{item.city}</span>
            </p>
            <Link to={`/car/${item._id}`} className="btn btn-primary">
              View Car
            </Link>
          </div>
          <ul>
            {item.autoGear === true ? (
              <li className="text-primary">
                <i className="fa fa-check"></i>Automatic Gear
              </li>
            ) : null}
          </ul>
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  car: state.car
});

export default connect(mapStateToProps, { search })(Cars);
