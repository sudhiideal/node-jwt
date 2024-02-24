import axios from "axios";

export function fetchProducts() {
  return axios
    .get("https://fakestoreapi.com/products")
    .then((res) => res.data)
    .catch((err) => console.error("Error in fetching Data", err));
}
