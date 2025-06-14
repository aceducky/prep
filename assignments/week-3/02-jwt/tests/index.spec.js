const jwt = require("jsonwebtoken");
const { signJwt, verifyJwt, decodeJwt, jwtPassword } = require("../index.js");

describe("signJwt", () => {
  test("signs a jwt correctly with valid email and password", () => {
    const token = signJwt("kirat@gmail.com", "123456");
    const decoded = jwt.decode(token);
    expect(decoded.username).toBe("kirat@gmail.com");
    expect(decoded.password).toBe("123456"); 
  });

  test("returns null if invalid email", () => {
    const token = signJwt("kirat", "123456");
    expect(token).toBe(null);
  });

  test("returns null if password is too short", () => {
    const token = signJwt("kirat@gmail.com", "12345");
    expect(token).toBe(null);
  });
});

describe("decodeJwt", () => {
  test("decodes a jwt correctly", () => {
    const token = jwt.sign(
      { username: "kirat@gmail.com", password: "123456" },
      jwtPassword
    );
    const decoded = decodeJwt(token);
    expect(decoded.username).toBe("kirat@gmail.com");
    expect(decoded.password).toBe("123456");
  });

  test("cant decode a non jwt string", () => {
    const decoded = decodeJwt("token");
    expect(decoded).toBe(false);
  });
});

describe("verifyJwt", () => {
  test("cant verify a jwt with incorrect password", () => {
    const token = jwt.sign(
      { username: "kirat@gmail.com", password: "123456" },
      "randomPassword"
    );
    const verified = verifyJwt(token);
    expect(verified).toBe(false);
  });

  test("verifies a jwt with the correct password", () => {
    const token = jwt.sign(
      { username: "kirat@gmail.com", password: "123456" },
      jwtPassword
    );
    const verified = verifyJwt(token);
    expect(verified).toBe(true);
  });

  test("cant verify a non jwt string", () => {
    const verified = verifyJwt("token");
    expect(verified).toBe(false);
  });
});
