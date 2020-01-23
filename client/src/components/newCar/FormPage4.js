import React, { Fragment } from "react";
import CheckBoxField from "../search/elements/CheckBoxField";
import TextField from "../search/elements/TextField";
import "../search/elements/styles.css";
import axios from "axios";

const FormPage4 = (props) => {
  const { values } = props;

  const next = (e) => {
    e.preventDefault();

    // props.saveCar();
  };
  const previous = (e) => {
    e.preventDefault();
    props.prevStep();
  };
  const onChange = (e) => {
    props.setImages(e);
    props.setFilename(e);
  };
  return (
    <div className="form-wrapper col s12 m6">
      <form
        className="form"
        action="/api/upload"
        method="post"
        encType="multipart/form-data"
      >
        <fieldset className="field-wrapper">
          <span className="checkbox-group">Add Images</span>
        </fieldset>

        <div class="custom-file mb-4">
          <input
            type="file"
            className="custom-file-input"
            name="carImage"
            onChange={onChange}
            formEncType="multipart/form-data"
          />
          <label className="custom-file-label" for="customFile">
            {props.values.filename}
          </label>
        </div>

        <fieldset className="field-wrapper">
          <input
            className="btn"
            type="submit"
            value="Save Car"
            // onClick={(e) => next(e)}
          />
          {/* <input
            className="btn"
            type="submit"
            value="Previous"
            onClick={(e) => previous(e)}
          /> */}
        </fieldset>
      </form>
    </div>
  );
};

export default FormPage4;
