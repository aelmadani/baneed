import React, { Fragment } from "react";
import ListField from "../layoutComponents/formElements/ListField";
import InputField from "../layoutComponents/formElements/InputField";
// import "../search/elements/styles.css";
import cars from "../../data/cars.json";

const makeList = cars.filter((car) => car.parent_id === "0");

const FormMainDetails = (props) => {
  const { values } = props;

  const next = (e) => {
    e.preventDefault();
    props.nextStep();
  };

  const getCarMakeField = () => {
    return (
      <ListField
        name="car-make"
        value={values.make}
        handleOnChange={props.handleChangeMake}
        listName="Car Make"
        options={makeList}
      />
    );
  };

  const getCarModelField = () => {
    const carMakeId = values.make
      ? makeList.find((el) => el.value === values.make).id
      : null;
    const modelList = cars.filter((car) => car.parent_id === carMakeId);
    return (
      <ListField
        name="car-model"
        value={values.model}
        handleOnChange={props.handleChangeModel}
        listName="Car Model"
        options={modelList ? modelList : [""]}
      />
    );
  };
  return (
    <div className="form-wrapper col s12 m6 full-height">
      <form className="form">
        {getCarMakeField()}
        {getCarModelField()}
        <InputField
          label="trim"
          value={values.trim}
          handleOnchange={props.handleChangeTrim}
          name="Model Trim"
        />
        <InputField
          label="price"
          value={values.price}
          handleOnchange={props.handleChangePrice}
          name="Price"
          placeholder="DKK"
        />
        <fieldset className="field-wrapper">
          <input
            className="btn"
            type="submit"
            value="Next"
            onClick={(e) => next(e)}
          />
        </fieldset>
      </form>
    </div>
  );
};

export default FormMainDetails;
