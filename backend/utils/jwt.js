const jwt = require("jsonwebtoken");

require("dotenv").config();

/**
 *
 * @param {*} input
 */
const generateJWT = (input) => {
  const token = jwt.sign(
    {
      id: input.id,
      email: input.email,
      username: input.username,
    },
    process.env.SECRET_KEY,
    { expiresIn: "1h" }
  );
  return token;
};

module.exports = {
  generateJWT,
};
