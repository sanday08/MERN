const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = validateProfileInput = (data) => {
  let errors = {};
  data.handle = !isEmpty(data.handle) ? data.handle : "";
  data.status = !isEmpty(data.status) ? data.status : "";
  data.skill = !isEmpty(data.skill) ? data.skill : "";

  if (Validator.isEmpty(data.handle))
    errors.handle = "handle must be requaired..";
  if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = "handle must be at list 2 charecter";
  }
  if (Validator.isEmpty(data.status))
    errors.status = "status must be requaired..";

  if (Validator.isEmpty(data.skill)) errors.skill = "skill must be requaired..";

  if (!isEmpty(data.website)) {
    if (!Validator.isURL(data.website)) {
      errors.website = "Enter valid website url.";
    }
  }
  if (!isEmpty(data.youtube)) {
    if (!Validator.isURL(data.youtube)) {
      errors.youtube = "Enter valid youtube url.";
    }
  }
  if (!isEmpty(data.instagram)) {
    if (!Validator.isURL(data.instagram)) {
      errors.instagram = "Enter valid instagram url.";
    }
  }
  if (!isEmpty(data.twitter)) {
    if (!Validator.isURL(data.twitter)) {
      errors.twitter = "Enter valid twitter url.";
    }
  }
  if (!isEmpty(data.facebook)) {
    if (!Validator.isURL(data.facebook)) {
      errors.facebook = "Enter valid facebook url.";
    }
  }
  if (!isEmpty(data.linkedin)) {
    if (!Validator.isURL(data.linkedin)) {
      errors.linkedin = "Enter valid linkedin url.";
    }
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};
