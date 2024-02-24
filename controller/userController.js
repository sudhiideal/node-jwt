import { validationResult } from "express-validator";
import User from "./../models/User.js";

import {
  commonErrorHandler,
  getErrorMessage,
} from "./../services/errorHandling.js";

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessage = getErrorMessage(errors);
    return next(commonErrorHandler(errorMessage, 422));
  }

  const { name, email, password } = req.body;
  let existinguser;
  try {
    existinguser = await User.findOne({ email: email });
  } catch (error) {
    console.log(error);
    return next(commonErrorHandler("User already exists", 500));
  }

  if (existinguser) {
    return next(commonErrorHandler("User already exists", 422));
  }

  const createdUser = new User({
    name,
    email,
    password,
  });
  try {
    await createdUser.save();
  } catch (error) {
    console.log(error);
    return next(commonErrorHandler("Signup failed", 500));
  }
  res.status(201).json({ user: createdUser.toObject({ getters: true }) });
};

const getAllUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, "-password");
  } catch (error) {
    return next(commonErrorHandler("Error Fetching users", 500));
  }
  res.json({ users: users.map((user) => user.toObject({ getters: true })) });
};

const userController = {
  signup,
  getAllUsers,
};

export default userController;
