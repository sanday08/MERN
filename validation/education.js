const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = validateEducationFields = (data) => {
  let errors = {};
  data.school = !isEmpty(data.school) ? data.school : "";
  data.degree = !isEmpty(data.degree) ? data.degree : "";
  data.from = !isEmpty(data.from) ? data.from : "";
  data.fieldOfStudy = !isEmpty(data.fieldOfStudy) ? data.fieldOfStudy : "";
  if (Validator.isEmpty(data.fieldOfStudy))
    errors.fieldOfStudy = "Field Of Study field Required";
  if (Validator.isEmpty(data.school)) errors.school = "School field required";
  if (Validator.isEmpty(data.degree)) errors.degree = "Company field Required";
  if (Validator.isEmpty(data.from)) errors.from = "From field Requaired";

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
