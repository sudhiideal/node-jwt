import { productData } from "../data/productData.js";
import { fetchProducts } from "../services/productsService.js";

const getProducts = async (req, res) => {
  const products = await fetchProducts();
  console.log("Data fetched from API");
  res.json(products);
};

const productsController = {
  getProducts,
};

export default productsController;
