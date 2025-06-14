const jwt = require("jsonwebtoken");
const jwtPassword = "secret";
const z = require("zod/v4");

/**
 * Generates a JWT for a given username and password.
 *
 * @param {string} username - The username to be included in the JWT payload.
 *                            Must be a valid email address.
 * @param {string} password - The password to be included in the JWT payload.
 *                            Should meet the defined length requirement (e.g., 6 characters).
 * @returns {string|null} A JWT string if the username and password are valid.
 *                        Returns null if the username is not a valid email or
 *                        the password does not meet the length requirement.
 */
function signJwt(username, password) {
  console.log("Username: ", username, "Password: ", password);
  const email_schema = z.email();
  const password_schema = z.string().min(6);
  const email_res = email_schema.safeParse(username);
  const password_res = password_schema.safeParse(password);
  if (!email_res.success || !password_res.success) {
    if (!email_res.success) console.log(z.prettifyError(email_res.error));
    if (!password_res.success) console.log(z.prettifyError(password_res.error));
    return null;
  }
  return jwt.sign({ username, password }, jwtPassword);
  // Your code here
}
console.log(signJwt("abc", "123"));
const u1 = signJwt("a@a.com", "123456");
console.log(u1);
/**
 * Verifies a JWT using a secret key.
 *
 * @param {string} token - The JWT string to verify.
 * @returns {boolean} Returns true if the token is valid and verified using the secret key.
 *                    Returns false if the token is invalid, expired, or not verified
 *                    using the secret key.
 */
function verifyJwt(token) {
  // Your code here

  try {
    jwt.verify(token, jwtPassword);
    return true;
  } catch (error) {
    return false;
  }
}
console.log(verifyJwt("some-random-word"));
console.log(verifyJwt(u1));

/**
 * Decodes a JWT to reveal its payload without verifying its authenticity.
 *
 * @param {string} token - The JWT string to decode.
 * @returns {object|false} The decoded payload of the JWT if the token is a valid JWT format.
 *                         Returns false if the token is not a valid JWT format.
 */
function decodeJwt(token) {
  // Your code here
  return jwt.decode(token) ?? false;
}

console.log(decodeJwt("12345"));
console.log("here", decodeJwt(u1));

module.exports = {
  signJwt,
  verifyJwt,
  decodeJwt,
  jwtPassword,
};
