import React from "react";
import "./styles.css";

const TextField = ({ label, name, value, handleOnchange }) => {
  return (
    <fieldset class="field-wrapper">
      <textarea
        name={label}
        placeholder={label}
        value={value}
        onChange={(e) => handleOnchange(e)}
      ></textarea>
      <label class="smart-placeholder" for={label}>
        {name}
      </label>
    </fieldset>
  );
};

export default TextField;
