const Validator = require("validator");
const isEmpty = require("is-empty");

const validateRegisterInput = (data) => {
  const errors = {};
  Object.keys(data).forEach((key) => {
    data[key] = !isEmpty(data[key]) ? data[key] : "";
  });

  //Empty field Validations

  Object.keys(data).forEach((key) => {
    if (Validator.isEmpty(data[key])) {
      errors[key] = `${key} field is required`;
    } else {
      if (key === "email") {
        if (!Validator.isEmail(data[key])) {
          errors[key] = `${key} is invalid`;
        }
      }
    }
  });

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }
  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports = validateRegisterInput;
