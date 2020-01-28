import React from "react";

const CheckBoxField = ({ name, option, checkboxValue, toggleCheckbox }) => {
  return (
    <div>
      <p>
        <label>
          <input
            type="checkbox"
            onClick={toggleCheckbox}
            checked={checkboxValue}
          />
          <span>{option}</span>
        </label>
      </p>
    </div>
  );
};

export default CheckBoxField;
