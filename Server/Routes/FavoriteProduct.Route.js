import express from "express";
import {
  addFavoriteProduct,
  getFavoriteProducts,
  deleteFavoriteProduct,
} from "../Controllers/FavoriteProduct.Controller.js";

const favoriteProductRouter = express.Router();
favoriteProductRouter.post("/addFavoriteProduct", addFavoriteProduct);
favoriteProductRouter.get("/getFavoriteProducts", getFavoriteProducts);
favoriteProductRouter.delete("/deleteFavoriteProduct", deleteFavoriteProduct);

export default favoriteProductRouter;
