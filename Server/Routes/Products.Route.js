import express from "express";
import {
  addProduct,
  deleteProduct,
  editProduct,
  getProduct,
  getProducts,
  gerProductRecommanded,
} from "../Controllers/Products.Controllers.js";
import multer from "multer";

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

var upload = multer({ storage: storage });
const productsRouter = express.Router();
productsRouter.post("/addProduct", upload.array("pictures", 6), addProduct);
productsRouter.get("/", getProducts);
productsRouter.post("/Recommanded", gerProductRecommanded);
productsRouter.get("/:productName", getProduct);
productsRouter.delete("/deleteProduct/:productName", deleteProduct);
productsRouter.put(
  "/editProduct/:productName",
  upload.array("pictures", 6),
  editProduct
);

export default productsRouter;
