import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getCar } from "./actions/index";

const Car = (props) => {
  const carId = props.match.params.id;
  //   console.log(carId);

  useEffect(() => {
    props.getCar(carId);
  }, []);

  const clickedCar = { ...props.car.car };

  return (
    <div>
      <div>
        <p>
          {clickedCar.make} {clickedCar.model}
        </p>
        <p>{clickedCar.trim}</p>
      </div>
      <div>
        <p>Price: </p>
        <p>{clickedCar.price} DKK</p>
        <p>Year: </p>
        <p>{clickedCar.year}</p>
        <p>Mileage: </p>
        <p>{clickedCar.mileage} km</p>
        <p>Gear Type: </p>
        {clickedCar.autoGear ? <p>Automatic</p> : <p>Manual</p>}
        <p>Color: </p>
        <p>{clickedCar.color}</p>
        <p>City: </p>
        <p>{clickedCar.city}</p>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  car: state.car
});

export default connect(mapStateToProps, { getCar })(Car);
