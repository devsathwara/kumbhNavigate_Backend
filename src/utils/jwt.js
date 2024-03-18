const {config}=require("../config/config");
const jwt = require("jsonwebtoken");
const sendResponse=require("./response");
const { StatusCodes } =require("http-status-codes");

const secret = config.env.jwt.secret;

 function createJWTToken(data, expiresIn) {
  if (!secret) {
    throw new Error("JWT Secret is not defined");
  }

  return jwt.sign(data, secret, { expiresIn: expiresIn });
}

 function validateJWTToken(token) {
  if (!secret) {
    throw new Error("JWT Secret is not defined");
  }

  try {
    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch (err) {
    console.log(err);
  }
}

 function decodeToken(res , token ) {
  const decoded  = validateJWTToken(token);

  // Check if the token is expired
  if (decoded.exp <= Date.now() / 1000) {
    return sendResponse(res, StatusCodes.BAD_REQUEST, {
      message: "Token has expired",
    });
  }
  return decoded;
}
module.export={createJWTToken,validateJWTToken,decodeToken}