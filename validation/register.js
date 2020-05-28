const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name must be between 2 and 30 charecter";
  }
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field must requaired";
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is Invalid";
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field must requaired";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at list 6 charecter requaired";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field must requaired";
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Password must be match";
  }
  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm Password field must requaired";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
