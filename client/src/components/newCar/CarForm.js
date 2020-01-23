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
  const [images, setImages] = useState([]);
  const [filename, setFilename] = useState([]);

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
    images,
    filename
  };

  const submit = () => {
    const formData = {};
    formData["make"] = values.make;
    formData["model"] = values.model;
    formData["trim"] = values.trim;
    formData["year"] = values.year;
    formData["mileage"] = values.mileage;
    formData["color"] = values.color;
    formData["price"] = values.price;
    formData["city"] = values.city;
    formData["autoGear"] = values.autoGear;
    formData["aircon"] = values.aircon;
    formData["parkCam"] = values.parkCam;
    formData["description"] = values.description;
    formData["filename"] = values.filename;

    const imageData = new FormData();
    imageData.append("carImage", images);
    // const config = {
    //     headers: {
    //         'content-type': 'multipart/form-data'
    //     }
    // };
    props.newCar(formData, imageData);
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
          handleChangeImages={(e) => setImages(e.currentTarget.value)}
          setImages={(e) => setImages(e.currentTarget.files[0])}
          setFilename={(e) => setFilename(e.currentTarget.files[0].name)}
          saveCar={() => submit()}
        />
      );
  }
  return <div></div>;
};

export default connect(null, { newCar })(CarForm);
