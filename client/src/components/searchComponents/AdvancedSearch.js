import React, { useState } from "react";
import { Link, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { search } from "../../actions/index";

import ListField from "../layoutComponents/formElements/ListField";
import CheckBoxField from "../layoutComponents/formElements/CheckBoxField";
import cars from "../../data/cars.json";
// import "./elements/styles.css";

const makeList = cars.filter((car) => car.parent_id === "0");
const mileage = [
  { value: "0", name: "0 km" },
  { value: "5000", name: "5.000 km" },
  { value: "25000", name: "25.000 km" },
  { value: "50000", name: "50.0000 km" },
  { value: "100000", name: "100.000 km" },
  { value: "999999", name: "Maximum" }
];

const colors = [
  { value: "white", name: "White" },
  { value: "black", name: "Black" },
  { value: "silver", name: "Silver" },
  { value: "red", name: "Red" },
  { value: "blue", name: "Blue" }
];

const maxPrices = [
  { value: "10000", name: "10.000 DKK" },
  { value: "25000", name: "25.000 DKK" },
  { value: "50000", name: "50.000 DKK" },
  { value: "100000", name: "100.000 DKK" },
  { value: "500000", name: "500.000 DKK" },
  { value: "999999", name: "Maximum" }
];

const years = (startYear) => {
  var currentYear = new Date().getFullYear();
  const years = [{ value: "1900", name: "Older" }];
  startYear = startYear || 1980;
  let y;
  while (startYear <= currentYear) {
    y = startYear++;
    years.push({ value: y.toString(), name: y.toString() });
  }
  return years.reverse();
};

const AdvancedSearch = (props) => {
  const [toResults, setToResults] = useState(false);

  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  // const [trim, setTrim] = useState("");
  const [minYear, setMinYear] = useState("2000");
  const [maxYear, setMaxYear] = useState("2020");
  const [maxMileage, setMaxMileage] = useState(999999);
  const [color, setColor] = useState("");
  // const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(999999);
  // const [city, setCity] = useState("");
  const [autoGear, setAutoGear] = useState(false);

  const [aircon, setAircon] = useState(false);
  const [parkCam, setParkCam] = useState(false);

  const getCarModelField = () => {
    if (!make) {
      return (
        <ListField
          name="car-model"
          value=""
          handleOnChange={(e) => setModel(e.currentTarget.value)}
          listName="Car Model"
          options={[""]}
        />
      );
    }

    const carMakeId = makeList.find((el) => el.value === make).id;
    const modelList = cars.filter((car) => car.parent_id === carMakeId);

    return (
      <ListField
        name="car-model"
        value={model}
        handleOnChange={(e) => setModel(e.currentTarget.value)}
        listName="Car Model"
        options={modelList}
      />
    );
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const searchObj = {};

    if (make !== "") {
      searchObj.make = make;
      if (model !== "") searchObj.model = model;
    }
    searchObj.minYear = minYear;
    searchObj.maxYear = maxYear;
    searchObj.maxMileage = maxMileage;
    searchObj.maxPrice = maxPrice;
    if (color !== "") searchObj.color = color;
    if (autoGear === true) searchObj.autoGear = autoGear;
    if (aircon === true) searchObj.aircon = aircon;
    if (parkCam === true) searchObj.parkCam = parkCam;

    var queryString = Object.keys(searchObj)
      .map((key) => key + "=" + searchObj[key])
      .join("&");

    // console.log("query string from advanced " + queryString);

    props.history.push("/cars?" + queryString);

    // console.log(searchObj);
  };

  return (
    <div className="form-wrapper col s12 m6">
      <h2 className="form-title">Advanced Search</h2>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <ListField
          name="car-make"
          value={make}
          handleOnChange={(e) => setMake(e.currentTarget.value)}
          listName="Car Make"
          options={makeList}
        />

        {getCarModelField()}

        <ListField
          name="max-mileage"
          value={maxMileage}
          handleOnChange={(e) => setMaxMileage(e.currentTarget.value)}
          listName="Max Mileage"
          options={mileage}
        />
        <ListField
          name="color"
          value={color}
          handleOnChange={(e) => setColor(e.currentTarget.value)}
          listName="Car Color"
          options={colors}
        />

        <ListField
          name="max-price"
          value={maxPrice}
          handleOnChange={(e) => setMaxPrice(e.currentTarget.value)}
          listName="Max Price"
          options={maxPrices}
        />

        <ListField
          name="min-year"
          value={minYear}
          handleOnChange={(e) => setMinYear(e.currentTarget.value)}
          listName="From Year"
          options={years()}
        />
        <ListField
          name="max-year"
          value={maxYear}
          handleOnChange={(e) => setMaxYear(e.currentTarget.value)}
          listName="To Year"
          options={years()}
        />

        <CheckBoxField
          name="auto-gear"
          option="Automatic Gear"
          toggleCheckbox={() => setAutoGear(!autoGear)}
          checkboxValue={autoGear}
        />
        <CheckBoxField
          name="aircon"
          option="Air Condition"
          toggleCheckbox={() => setAircon(!aircon)}
          checkboxValue={aircon}
        />
        <CheckBoxField
          name="park-cam"
          option="Parking Camera"
          toggleCheckbox={() => setParkCam(!parkCam)}
          checkboxValue={parkCam}
        />
        <fieldset className="field-wrapper">
          <input className="btn" type="submit" value="Search!" />
        </fieldset>
      </form>
    </div>
  );
};

export default connect(null, { search })(withRouter(AdvancedSearch));
