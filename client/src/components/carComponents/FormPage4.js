import React, { useState } from "react";
// import "../search/elements/styles.css";
import FirebaseUpload from "./FirebaseUpload";
// // file upload imports
// import FileUploader from "react-firebase-file-uploader";
// import firebase from "firebase";
// import firebaseConfig from "../../firebaseConfig";
// firebase.initializeApp(firebaseConfig);
//

const FormPage4 = (props) => {
  const { values } = props;

  // const [filenames, setFilenames] = useState([]);
  // const [imageUrls, setImageUrls] = useState([]);
  // const [progress, setProgress] = useState(0);

  // const handleUploadStart = () => {
  //   setProgress(0);
  // };

  // const handleUploadSuccess = (filename) => {
  //   // const newUrl = await firebase
  //   //   .storage()
  //   //   .ref("carImages")
  //   //   .child(filename)
  //   //   .getDownloadURL();
  //   firebase
  //     .storage()
  //     .ref("carImages")
  //     .child(filename)
  //     .getDownloadURL()
  //     .then((url) => {
  //       setImageUrls([...imageUrls, url]);

  //       setFilenames([...filenames, filename]);
  //     });

  //   setProgress(100);
  //   // props.setImageLinks(url);
  //   console.log(imageUrls);
  // };

  const next = (e) => {
    e.preventDefault();

    props.saveCar();
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
