import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import User from "./../models/User.js";

import {
  commonErrorHandler,
  getErrorMessage,
} from "./../services/errorHandling.js";

// const authenticateUser = (req, res) => {
//   //Authenicate the user
//   const { username } = req.body;
//   const user = { name: username };
//   const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_KEY);
//   res.json({ accessToken });
// };

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token === null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

export const login = async (req, res, next) => {
  const { name, password } = req.body;

  let existinguser;
  try {
    existinguser = await User.findOne({ name: name });
  } catch (error) {
    console.log(error);
    return next(commonErrorHandler("User does not exists", 500));
  }
  if (!existinguser || existinguser.password !== password) {
    return next(commonErrorHandler("User does not exists", 500));
  }
  const user = { name: existinguser.name, password: existinguser.password };
  const accessToken = generateAccessToken(user);
  // const accessToken = jwt.sign(
  //   { name: existinguser.name, password: existinguser.password },
  //   process.env.ACCESS_TOKEN_KEY
  // );
  res.json({ accessToken, status: true });
};

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_KEY, { expiresIn: "10m" });
}

const authController = {
  authenticateToken,
  // authenticateUser,
  login,
};

export default authController;
