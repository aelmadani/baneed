import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getCar, addToFavList } from "../../actions/index";
import cars from "../../data/cars.json";
import Slideshow from "../layoutComponents/Slideshow/Slideshow";
import BackButton from "../layoutComponents/BackButton";

const cities = [
  { value: "cph", name: "Copenhagen" },
  { value: "aarhus", name: "Århus" },
  { value: "odense", name: "Odense" }
];

const Car = (props) => {
  const carId = props.match.params.id;
  //   console.log(carId);

  useEffect(() => {
    props.getCar(carId);
  }, [props.getCar]);

  const clickedCar = { ...props.car.car };
  let carLinks = clickedCar.imageLinks;

  const makevalue = cars.find((car) => car.value === clickedCar.make);
  // console.log(makevalue);

  const renderFavCell = (carId) => {
    if (props.auth) {
      if (props.auth.favList.includes(carId)) {
        return (
          <div
            onClick={() => handleFav(carId)}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer"
            }}
          >
            <span
              className="orange-text text-accent-3 "
              style={{ fontSize: "1rem" }}
            >
              Remove from favorites{" "}
            </span>
            <i class="material-icons orange-text text-accent-3  ">favorite</i>
          </div>
        );
      } else {
        return (
          <div
            onClick={() => handleFav(carId)}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer"
            }}
          >
            <span
              className="orange-text text-accent-3 "
              style={{ fontSize: "1rem" }}
            >
              {" "}
              Add to favorites{" "}
            </span>

            <i class="material-icons orange-text text-accent-3">
              favorite_border
            </i>
          </div>
        );
      }
    }
  };
  const handleFav = (id) => {
    props.addToFavList(id);
  };

  return !clickedCar ? (
    <div class="progress">
      <div class="indeterminate"></div>
    </div>
  ) : (
    <div style={{ background: "#F8F8F8", padding: "1rem 0" }}>
      <div className="car-title">
        <span>
          {clickedCar.make
            ? cars.find((car) => car.value === clickedCar.make).name
            : ""}{" "}
          {clickedCar.model
            ? cars.find((car) => car.value === clickedCar.model).name
            : ""}{" "}
          {clickedCar.trim}
        </span>
        <br />
        {clickedCar._id ? renderFavCell(clickedCar._id.toString()) : ""}
      </div>
      {clickedCar.imageLinks ? (
        <Slideshow imageLinks={clickedCar.imageLinks} />
      ) : (
        ""
      )}

      <div className="car-info">
        <h5>Car info</h5>
        <p>
          Price: <span>{clickedCar.price} DKK</span> , Year:{" "}
          <span>{clickedCar.year}</span>, Mileage:{" "}
          <span>{clickedCar.mileage} km.</span>
        </p>
        <h5>More info</h5>
        <p>
          {clickedCar.autoGear ? (
            <span>Automatic Gear</span>
          ) : (
            <span>Manual Gear</span>
          )}
          , color: {clickedCar.color}
          {clickedCar.aircon ? <span>, aircondition</span> : ""}
          {clickedCar.parkCam ? <span>, parking camera</span> : ""}.
        </p>
        <h5>Location</h5>
        <p>
          {clickedCar.city
            ? cities.find((city) => city.value === clickedCar.city).name
            : ""}
        </p>
      </div>
      <br />
      <br />
      <BackButton />
      <br />
    </div>
  );
};

const mapStateToProps = (state) => ({
  car: state.car,
  auth: state.auth
});

export default connect(mapStateToProps, { getCar, addToFavList })(
  withRouter(Car)
);
