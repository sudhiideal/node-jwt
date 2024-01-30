import express from "express";

import productsController from "../controller/productsController.js";
import authController from "../controller/authController.js";

const router = express.Router();

router.get(
  "/",
  authController.authenticateToken,
  productsController.getProducts
);

export default router;
