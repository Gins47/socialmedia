const jwt = require("jsonwebtoken");

const { AuthenticationError } = require("apollo-server");
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

const authVerification = (context) => {
  const authHeader = context.req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split("Bearer ")[1];
    if (token) {
      try {
        const user = jwt.verify(token, process.env.SECRET_KEY);
        return user;
      } catch (err) {
        throw new AuthenticationError(` Invalid or expired token`);
      }
    }

    throw new AuthenticationError(` Authorization must be bearer token`);
  }

  throw new AuthenticationError(` Token must be provided in the header`);
};

module.exports = {
  generateJWT,
  authVerification,
};
