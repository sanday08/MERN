import React from "react";
import PropType from "prop-types";

import classname from "classname";

function SelectListGroup({ name, value, onChange, error, info, option }) {
  const selectOption = option.map((option) => (
    <option key={option.lable} value={option.value}>
      {option.lable}
    </option>
  ));
  return (
    <div className="form-group">
      <select
        className={classname("form-control form-control-lg", {
          "is-invalid": error,
        })}
        name={name}
        value={value}
        onChange={onChange}
      >
        {selectOption}
      </select>
      <small className="form-text text-muted">{info}</small>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
}

SelectListGroup.propType = {
  name: PropType.string.isRequired,
  value: PropType.string.isRequired,
  option: PropType.string.isRequired,
  onChange: PropType.func.isRequired,
  error: PropType.string,
  info: PropType.string,
};

export default SelectListGroup;
