import React, { useState } from "react";
import "../search/elements/styles.css";
// file upload imports
import FileUploader from "react-firebase-file-uploader";
import firebase from "firebase";
import firebaseConfig from "../../firebaseConfig";
firebase.initializeApp(firebaseConfig);
//

const FormPage4 = (props) => {
  const { values } = props;

  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [progress, setProgress] = useState(0);

  const handleUploadStart = () => {
    setProgress(0);
  };

  const handleUploadSuccess = (filename) => {
    setImage(filename);
    setProgress(100);
    firebase
      .storage()
      .ref("carImages")
      .child(filename)
      .getDownloadURL()
      .then((url) => {
        setImageUrl(url);
        props.setFilename(url);
      });
  };

  const next = (e) => {
    e.preventDefault();

    props.saveCar();
  };
  const previous = (e) => {
    e.preventDefault();
    props.prevStep();
  };

  console.log(imageUrl);
  console.log(progress);
  // const onChange = (e) => {
  //   props.setImages(e);
  //   props.setFilename(e);
  // };
  return (
    <div className="form-wrapper col s12 m6">
      <form
        className="form"
        // action="/api/upload"
        // method="post"
        // encType="multipart/form-data"
      >
        <fieldset className="field-wrapper">
          <span className="checkbox-group">Add Images</span>
        </fieldset>

        <FileUploader
          accept="image/*"
          name="carImage"
          storageRef={firebase.storage().ref("carImages")}
          onUploadStart={handleUploadStart}
          onUploadSuccess={handleUploadSuccess}
          filename={"IMG-" + Date.now()}
        />

        <div>
          <img src="" alt="" />
        </div>

        {/* <div class="custom-file mb-4">
          <input
            id="img"
            type="file"
            className="custom-file-input"
            name="carImage"
            onChange={onChange}
            formEncType="multipart/form-data"
          />
          <label className="custom-file-label" for="customFile">
            {props.values.filename}
          </label>
        </div> */}

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
