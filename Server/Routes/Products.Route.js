import express from "express";
import { addProduct,getProducts,deleteProduct,editProduct } from "../Controllers/Products.Controllers.js";

const productsRouter = express.Router(); 
productsRouter.post('/addProduct', addProduct);
productsRouter.get('/', getProducts);
productsRouter.delete('/deleteProduct/:productId', deleteProduct);
productsRouter.put('/editProduct/:productId', editProduct);

 
export default productsRouter;