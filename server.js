import express from "express";
import mongoose from "mongoose";
import "./config.js";
import { mongoDBURL } from "./dbSettings.js";

import authRouter from "./routes/authRoutes.js";
import productsRouter from "./routes/productsRoutes.js";
import cartRouter from "./routes/cartRoutes.js";
import userRouter from "./routes/userRoutes.js";
import { routeErrorHandler, errorHandling } from "./services/errorHandling.js";

const app = express();
app.use(express.json());

app.use("/", authRouter);
// app.use("/login", authRouter);
// app.use("/signup", authRouter);
app.use("/products", productsRouter);
app.use("/cart", cartRouter);
app.use("/user", userRouter);
app.use(routeErrorHandler);
app.use(errorHandling);

const port = 3000;

mongoose
  .connect(mongoDBURL)
  .then(() => {
    app.listen(port, () => {
      console.log(`Server started at ${port}`);
    });
  })
  .catch((err) => {
    console.log("Database connection Error", err);
  });

// app.listen(port, () => {
//   console.log(`Server started at ${port}`);
// });
