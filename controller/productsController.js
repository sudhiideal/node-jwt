import { productData } from "../data/productData.js";

const getProducts = (req, res) => {
  res.json(productData);
};

const productsController = {
  getProducts,
};

export default productsController;
