import express from "express";
import {
  search,
  filterProductsByCategory,
} from "../Controllers/Products.Search.Controller.js";

const SearchRouter = express.Router();

SearchRouter.get("/", search);
SearchRouter.get("/filter", filterProductsByCategory);
export default SearchRouter;
