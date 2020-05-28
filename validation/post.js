const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = postFieldValidate = (data) => {
  let errors = {};
  data.text = !isEmpty(data.text) ? data.text : "";
  if (!Validator.isEmpty(data.text)) errors.text = "Text field must requaire";

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
