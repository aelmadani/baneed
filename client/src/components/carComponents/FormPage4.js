import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import FirebaseUpload from "./FirebaseUpload";

// firebase.initializeApp(firebaseConfig);
//

const FormPage4 = (props) => {
  const { values } = props;

  const next = (e) => {
    e.preventDefault();

    props.saveCar();
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
          <span className="checkbox-group">Add Images</span>
        </fieldset>
        <FirebaseUpload setImageLinks={props.setImageLinks} />

        <fieldset className="field-wrapper">
          <input
            className="btn"
            type="submit"
            value="Save Car"
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

export default FormPage4;
