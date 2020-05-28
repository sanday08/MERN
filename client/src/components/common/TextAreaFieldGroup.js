import React from "react";
import PropType from "prop-types";

import classname from "classname";

function TextAreaFieldGroup({
  name,
  value,
  placeholder,
  onChange,
  error,
  info,
}) {
  return (
    <div className="form-group">
      <textarea
        className={classname("form-control form-control-lg", {
          "is-invalid": error,
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      ></textarea>
      <small className="form-text text-muted">{info}</small>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
}

TextAreaFieldGroup.propType = {
  name: PropType.string.isRequired,
  value: PropType.string.isRequired,
  placeholder: PropType.string,
  onChange: PropType.func.isRequired,
  error: PropType.string,
  info: PropType.string,
};

export default TextAreaFieldGroup;
