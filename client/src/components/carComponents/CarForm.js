import React, { useState } from "react";
import { Link, Redirect, withRouter } from "react-router-dom";

import { connect } from "react-redux";
import { newCar } from "../../actions/index";

import FormPage1 from "./FormPage1";
import FormPage2 from "./FormPage2";
import FormPage3 from "./FormPage3";
import FormPage4 from "./FormPage4";

const CarForm = (props) => {
  const [step, setStep] = useState(1);
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [trim, setTrim] = useState("");
  const [year, setYear] = useState("");
  const [mileage, setMileage] = useState("");
  const [color, setColor] = useState("");
  const [price, setPrice] = useState("");
  const [city, setCity] = useState("");
  const [autoGear, setAutoGear] = useState(false);
  const [aircon, setAircon] = useState(false);
  const [parkCam, setParkCam] = useState(false);
  const [description, setDescription] = useState("");
  const [imageLinks, setImageLinks] = useState("");

  const values = {
    make,
    model,
    trim,
    year,
    mileage,
    color,
    price,
    city,
    autoGear,
    aircon,
    parkCam,
    description,
    imageLinks
  };

  const submit = () => {
    const formData = {};
    formData["make"] = make;
    formData["model"] = model;
    formData["trim"] = trim;
    formData["year"] = year;
    formData["mileage"] = mileage;
    formData["color"] = color;
    formData["price"] = price;
    formData["city"] = city;
    formData["autoGear"] = autoGear;
    formData["aircon"] = aircon;
    formData["parkCam"] = parkCam;
    formData["description"] = description;
    formData["imageLinks"] = imageLinks;

    props.newCar(formData);
  };

  switch (step) {
    case 1:
      return (
        <FormPage1
          nextStep={() => setStep(step + 1)}
          handleChangeMake={(e) => setMake(e.currentTarget.value)}
          handleChangeModel={(e) => setModel(e.currentTarget.value)}
          handleChangeTrim={(e) => setTrim(e.currentTarget.value)}
          handleChangePrice={(e) => setPrice(e.currentTarget.value)}
          values={values}
        />
      );

    case 2:
      return (
        <FormPage2
          values={values}
          nextStep={() => setStep(step + 1)}
          prevStep={() => setStep(step - 1)}
          handleChangeColor={(e) => setColor(e.currentTarget.value)}
          handleChangeYear={(e) => setYear(e.currentTarget.value)}
          handleChangeMileage={(e) => setMileage(e.currentTarget.value)}
          handleChangeCity={(e) => setCity(e.currentTarget.value)}
        />
      );
    case 3:
      return (
        <FormPage3
          values={values}
          nextStep={() => setStep(step + 1)}
          prevStep={() => setStep(step - 1)}
          handleChangeAutoGear={() => setAutoGear(!autoGear)}
          handleChangeAircon={() => setAircon(!aircon)}
          handleChangeParkCam={() => setParkCam(!parkCam)}
          handleChangeDescription={(e) => setDescription(e.currentTarget.value)}
        />
      );
    case 4:
      return (
        <FormPage4
          values={values}
          nextStep={() => setStep(step + 1)}
          prevStep={() => setStep(step - 1)}
          setImageLinks={setImageLinks}
          saveCar={() => submit()}
        />
      );
  }
  return <div></div>;
};

export default connect(null, { newCar })(CarForm);
