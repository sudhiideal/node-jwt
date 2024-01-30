import express from "express";
import "./config.js";

import authRouter from "./routes/authRoutes.js";
import productsRouter from "./routes/productsRoutes.js";
import cartRouter from "./routes/cartRoutes.js";

const app = express();
app.use(express.json());

app.use("/login", authRouter);
app.use("/products", productsRouter);
app.use("/cart", cartRouter);

app.listen(3000, () => {
  console.log("Server started at 3000");
});
