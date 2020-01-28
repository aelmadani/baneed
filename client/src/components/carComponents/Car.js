import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getCar } from "../../actions/index";
import cars from "../../data/cars.json";

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
  }, []);

  const clickedCar = { ...props.car.car };
  const makevalue = cars.find((car) => car.value === clickedCar.make);
  console.log(makevalue);
  return !clickedCar ? (
    <div class="progress">
      <div class="indeterminate"></div>
    </div>
  ) : (
    <div>
      <div>
        <p>
          {clickedCar.make
            ? cars.find((car) => car.value === clickedCar.make).name
            : ""}{" "}
          {clickedCar.model
            ? cars.find((car) => car.value === clickedCar.model).name
            : ""}
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
        <p>
          {clickedCar.city
            ? cities.find((city) => city.value === clickedCar.city).name
            : ""}
        </p>
        <p>photos: </p>
        <p>{clickedCar.imageLinks ? clickedCar.imageLinks[0] : ""}</p>
        <br />
        <br />
        <div>
          <img src={clickedCar.filename} alt="" />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  car: state.car
});

export default connect(mapStateToProps, { getCar })(Car);
