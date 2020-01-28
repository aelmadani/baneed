import React from "react";
import "./styles.css";

const InputField = ({ label, name, value, handleOnchange, placeholder }) => {
  return (
    <fieldset class="field-wrapper">
      <input
        // style={{ left: "1330px", margin: "12px" }}
        name={label}
        placeholder={placeholder}
        value={value}
        onChange={(e) => handleOnchange(e)}
        type="text"
      ></input>
      <label className="smart-placeholder" for={label}>
        {name}
      </label>
    </fieldset>
  );
};

export default InputField;
