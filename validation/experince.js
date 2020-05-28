const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = validateExperienceField = (data) => {
  let errors = {};
  data.title = !isEmpty(data.title) ? data.title : "";
  data.company = !isEmpty(data.company) ? data.company : "";
  data.from = !isEmpty(data.from) ? data.from : "";

  if (Validator.isEmpty(data.title)) errors.title = "Title field required";
  if (Validator.isEmpty(data.company))
    errors.company = "Company field Required";

  if (Validator.isEmpty(data.from)) errors.from = "From field Requaired";
  console.log(errors);
  return {
    errors,
    isValid: isEmpty(errors),
  };
};
