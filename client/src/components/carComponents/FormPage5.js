import React, { useState } from "react";
import { Link } from "react-router-dom";
import FirebaseUpload from "./FirebaseUpload";

// firebase.initializeApp(firebaseConfig);
//

const FormPage5 = (props) => {
  const { values } = props;

  const onClick = () => {
    props.history.push("/dashboard");
  };

  return (
    <div>
      <div style={{ margin: "100px auto", width: "100%", textAlign: "center" }}>
        <i
          style={{
            fontSize: "200px",
            color: "#ff9100"
          }}
          class="material-icons"
        >
          check_circle_outline
        </i>
        <p>Congratulations! Car is saved!!</p>
        <br></br>
        <Link className="btn" style={{ margin: "auto" }} to="/dashboard">
          Back to Dashboard
        </Link>
      </div>{" "}
    </div>
  );
};

export default FormPage5;
