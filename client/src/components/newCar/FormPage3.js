import React, { Fragment } from "react";
import CheckBoxField from "../search/elements/CheckBoxField";
import TextField from "../search/elements/TextField";
import "../search/elements/styles.css";

const FormPage3 = (props) => {
  const { values } = props;

  const next = (e) => {
    e.preventDefault();
    props.nextStep();
  };
  const previous = (e) => {
    e.preventDefault();
    props.prevStep();
  };

  return (
    <div className="form-wrapper col s12 m6">
      <form className="form">
        <fieldset className="field-wrapper">
          <span className="checkbox-group">Other options</span>
          <CheckBoxField
            name="auto-gear"
            option="Automatic Gear"
            toggleCheckbox={props.handleChangeAutoGear}
            checkboxValue={values.autoGear}
          />
          <CheckBoxField
            name="aircon"
            option="Air Condition"
            toggleCheckbox={props.handleChangeAircon}
            checkboxValue={values.aircon}
          />
          <CheckBoxField
            name="park-cam"
            option="Parking Camera"
            toggleCheckbox={props.handleChangeParkCam}
            checkboxValue={values.parkCam}
          />
        </fieldset>
        <TextField
          label="description"
          value={values.description}
          handleOnchange={props.handleChangeDescription}
          name="Description"
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

export default FormPage3;
