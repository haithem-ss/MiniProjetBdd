import express from "express";
import {
  addCategory,
  deleteCategory,
  getCategories,
  editCategory,
} from "../Controllers/Categories.Controller.js";

const CategoriesRouter = express.Router();
CategoriesRouter.post("/addCategory", addCategory);
CategoriesRouter.get("/", getCategories);
CategoriesRouter.delete("/deleteCategory/:categoryName", deleteCategory);
CategoriesRouter.put("/editCategory/:categoryName", editCategory);

export default CategoriesRouter;
