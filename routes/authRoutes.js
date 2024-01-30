import express from "express";

import authController from "../controller/authController.js";

const router = express.Router();

router.post("/", authController.authenticateUser);

export default router;
