import express from "express";
import {
  searchProducts,
  filterProductsByCategory,
} from "../Controllers/Products.Search.Controller.js";

const SearchRouter = express.Router();

SearchRouter.get("/", searchProducts);
SearchRouter.get("/filter", filterProductsByCategory);
export default SearchRouter;
