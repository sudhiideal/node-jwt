import express from "express";

import authController from "../controller/authController.js";
import userController from "../controller/userController.js";

const router = express.Router();

router.post("/login", authController.login);
router.post("/signup", userController.signup);

export default router;
