import React from "react";
import PropType from "prop-types";

import classname from "classname";

function InputGroup({ type, name, value, placeholder, icon, onChange, error }) {
  return (
    <div>
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text">
            <i className={icon} />
          </span>
        </div>
        <input
          type={type}
          className={classname("form-control form-control-lg", {
            "is-invalid": error,
          })}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
        />

        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    </div>
  );
}

InputGroup.propType = {
  type: PropType.string.isRequired,
  name: PropType.string.isRequired,
  value: PropType.string.isRequired,
  placeholder: PropType.string,
  onChange: PropType.func.isRequired,
  error: PropType.string,
  icon: PropType.string,
};
InputGroup.defaultProps = {
  types: "text",
};
export default InputGroup;
