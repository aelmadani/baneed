import React, { Fragment } from "react";
import ListField from "../search/elements/ListField";
import InputField from "../search/elements/InputField";
import "../search/elements/styles.css";

const colors = [
  { value: "white", name: "White" },
  { value: "black", name: "Black" },
  { value: "silver", name: "Silver" },
  { value: "red", name: "Red" },
  { value: "blue", name: "Blue" }
];

const cities = [
  { value: "cph", name: "Copenhagen" },
  { value: "aarhus", name: "Århus" },
  { value: "odense", name: "Odense" }
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
const FormPage2 = (props) => {
  const { values } = props;

  const next = (e) => {
    e.preventDefault();
    props.nextStep();
  };
  const previous = (e) => {
    e.preventDefault();
    props.prevStep();
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="form-wrapper col s12 m6">
      <form className="form">
        <ListField
          name="car-color"
          value={values.color}
          handleOnChange={props.handleChangeColor}
          listName="Car Color"
          options={colors}
        />
        <ListField
          name="year"
          value={values.year}
          handleOnChange={props.handleChangeYear}
          listName="Year"
          options={years()}
        />
        <InputField
          label="mileage"
          value={values.mileage}
          handleOnchange={props.handleChangeMileage}
          name="Mileage"
          placeholder="km"
        />
        <ListField
          name="city"
          value={values.city}
          handleOnChange={props.handleChangeCity}
          listName="City"
          options={cities}
        />
        <fieldset className="field-wrapper">
          <input
            className="btn"
            type="submit"
            value="Next"
            onClick={(e) => next(e)}
          />
          <input
            className="btn"
            type="submit"
            value="Previous"
            onClick={(e) => previous(e)}
          />
        </fieldset>
      </form>
    </div>
  );
};

export default FormPage2;
