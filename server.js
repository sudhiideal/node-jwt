import express from "express";
import "./config.js";
import { productData } from "./productData.js";
import { cartData } from "./cartData.js";
import jwt from "jsonwebtoken";

const app = express();
app.use(express.json());

app.get("/products", authenticateToken, (req, res) => {
  res.json(productData);
});

app.get("/cart", authenticateToken, (req, res) => {
  res.json(cartData.filter((cart) => cart.username === req.user.name));
});

app.post("/login", (req, res) => {
  //Authenicate the user
  const { username } = req.body;
  const user = { name: username };
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_KEY);
  res.json({ accessToken });
});

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

app.listen(3000, () => {
  console.log("Server started at 3000");
});
