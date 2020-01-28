import React from "react";
import "./styles.css";

const ListField = ({ label, value, handleOnChange, listName, options }) => {
  return (
    <fieldset className="field-wrapper select">
      <select name={label} value={value} onChange={(e) => handleOnChange(e)}>
        <option value="" disabled selected>
          {listName}
        </option>
        {options.map((make) => (
          <option key={make.value} value={make.value}>
            {make.name}
          </option>
        ))}
      </select>
      <label className="smart-placeholder" htmlFor={label}>
        {listName}
      </label>
    </fieldset>
  );
};

export default ListField;
