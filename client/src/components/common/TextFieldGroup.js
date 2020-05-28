import React from "react";
import PropType from "prop-types";

import classname from "classname";

function TextFieldGroup({
  type,
  name,
  value,
  placeholder,
  onChange,
  error,
  info,
  disabled,
}) {
  return (
    <div className="form-group">
      <input
        type={type}
        className={classname("form-control form-control-lg", {
          "is-invalid": error,
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      <small className="form-text text-muted">{info}</small>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
}

TextFieldGroup.propType = {
  type: PropType.string.isRequired,
  name: PropType.string.isRequired,
  value: PropType.string.isRequired,
  placeholder: PropType.string,
  onChange: PropType.func.isRequired,
  error: PropType.string,
  info: PropType.string,
  disabled: PropType.string,
};
TextFieldGroup.defaultProps = {
  types: "text",
};
export default TextFieldGroup;
