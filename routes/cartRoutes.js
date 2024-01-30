import express from "express";

import cartController from "../controller/cartController.js";
import authController from "../controller/authController.js";

const router = express.Router();

router.get("/", authController.authenticateToken, cartController.getCart);

export default router;
