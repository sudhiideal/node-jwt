import { cartData } from "../data/cartData.js";

const getCart = (req, res) => {
  res.json(cartData.filter((cart) => cart.username === req.user.name));
};

const cartController = { getCart };

export default cartController;
