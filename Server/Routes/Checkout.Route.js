import express from "express";
import {
  PaymentCheckout,
  getPayment,
} from "../Controllers/Checkout.Controller.js";

const CheckoutRouter = express.Router();
CheckoutRouter.post("/payment", PaymentCheckout);
CheckoutRouter.get("/payment", getPayment);
export default CheckoutRouter;
