import React, { Component } from "react";
// import "../search/elements/styles.css";
// file upload imports
import FileUploader from "react-firebase-file-uploader";
import firebase from "firebase";
import firebaseConfig from "../../firebaseConfig";
firebase.initializeApp(firebaseConfig);

export class FirebaseUpload extends Component {
  state = {
    filenames: [],
    downloadURLs: [],
    uploadProgress: 0
  };

  handleUploadStart = () =>
    this.setState({
      uploadProgress: 0
    });

  handleUploadSuccess = async (filename) => {
    const downloadURL = await firebase
      .storage()
      .ref("carImages")
      .child(filename)
      .getDownloadURL();

    this.setState((oldState) => ({
      filenames: [...oldState.filenames, filename],
      downloadURLs: [...oldState.downloadURLs, downloadURL],
      uploadProgress: 100
    }));
    this.props.setImageLinks(this.state.downloadURLs);
  };
  render() {
    return (
      <div>
        <FileUploader
          accept="image/*"
          name="carImage"
          randomizeFilename
          storageRef={firebase.storage().ref("carImages")}
          onUploadStart={this.handleUploadStart}
          onUploadSuccess={this.handleUploadSuccess}
          multiple
        />

        <p>Progress: {this.state.uploadProgress}</p>

        <p>Filenames: {this.state.filenames.join(", ")}</p>

        <div>
          {this.state.downloadURLs.map((downloadURL, i) => {
            return <img key={i} src={downloadURL} />;
          })}
        </div>
      </div>
    );
  }
}

export default FirebaseUpload;
