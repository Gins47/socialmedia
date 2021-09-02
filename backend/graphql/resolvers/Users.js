const User = require("../../models/Users");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const { UserInputError } = require("apollo-server");
const { validateUserRegistrationInput, validateUserLogin } = require("../../utils/validators");
const { generateJWT } = require("../../utils/jwt");

module.exports = {
  Mutation: {
    // User login
    /**
     *
     * @param {*} _
     * @param {*} username
     * @param {*} password
     * @returns
     */
    async userLogin(_, { username, password }) {
      //Validate user Input

      const { errors, valid } = validateUserLogin(username, password);
      if (!valid) {
        throw new UserInputError("Input validation error", { errors });
      }
      // Check user
      const user = await User.findOne({ username });
      if (!user) {
        errors.username = "User Not Found";
        throw new UserInputError("User not found", { errors });
      }
      // Verify the password
      const passwordCheck = await bcrypt.compare(password, user.password);
      if (!passwordCheck) {
        errors.general = "Password is Incorrect";
        throw new UserInputError("Password Incorrect", { errors });
      }
      // Generate token for user
      const token = generateJWT(user);

      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },

    /**
     *
     * @param {*} _
     * @param {*} param1
     * @returns
     */

    // User Registration

    async register(_, { registerInput: { username, email, password, confirmPassword } }) {
      //: Validate user data
      const { errors, valid } = await validateUserRegistrationInput(username, email, password, confirmPassword);
      if (!valid) {
        throw new UserInputError("Input validation errors", { errors });
      }
      // User already exist
      const user = await User.findOne({ username });
      if (user) {
        throw new UserInputError("User already taken", {
          errors: {
            username: "Username already taken",
          },
        });
      }
      //Hash password and return token
      password = await bcrypt.hash(password, 12);
      const newUser = new User({
        email,
        username,
        password,
        createdAt: new Date().toISOString(),
      });
      //Save new user to db
      const res = await newUser.save();
      const token = generateJWT(res);

      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
  },
};
