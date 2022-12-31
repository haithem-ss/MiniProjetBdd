import express from "express";
import { addProduct,getProducts,getProduct,deleteProduct,editProduct } from "../Controllers/Products.Controllers.js";
import multer from "multer";

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  } 
})

var upload = multer({ storage: storage })
const productsRouter = express.Router(); 
productsRouter.post('/addProduct',upload.array('profile-files', 6), addProduct);
productsRouter.get('/', getProducts);
productsRouter.get('/:productName', getProduct);
productsRouter.delete('/deleteProduct/:productName', deleteProduct);
productsRouter.put('/editProduct/:productId', editProduct);

 
export default productsRouter;