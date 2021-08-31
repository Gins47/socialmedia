const { Types } = require("mongoose");
// User registration validation
/**
 *
 * @param {*} username
 * @param {*} email
 * @param {*} password
 * @param {*} confirmPassword
 * @returns
 */
const validateUserRegistrationInput = async (username, email, password, confirmPassword) => {
  const errors = {};
  if (username.trim() === "") {
    errors.username = "Username must not be empty";
  }
  if (email.trim() === "") {
    errors.email = "email must not be empty";
  }
  if (password.trim() === "") {
    errors.password = "password must not be empty";
  } else if (confirmPassword != password) {
    errors.confirmPassword = "Password doesnot match with confirm password";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

// User login validation
/**
 *
 * @param {*} username
 * @param {*} password
 * @returns
 */
const validateUserLogin = (username, password) => {
  const errors = {};
  if (username.trim() === "") {
    errors.username = "Username cannot be empty";
  }
  if (password.trim() === "") {
    errors.password = "Password cannot be empty";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
/**
 * Get Post by ID
 * @param {*} postID
 * @returns
 */
const validatePostID = (postID) => {
  const errors = {};
  if (postID.trim() === "") {
    errors.postID = "PostId cannot be empty";
  }
  if (!Types.ObjectId.isValid(postID)) {
    errors.postID = "PostId is not valid";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports = {
  validateUserRegistrationInput,
  validateUserLogin,
  validatePostID,
};
