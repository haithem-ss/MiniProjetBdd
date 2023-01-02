import express from "express";
import {
  PaymentCheckout,
  getPayment,
  getPayments,
} from "../Controllers/Checkout.Controller.js";

const CheckoutRouter = express.Router();
CheckoutRouter.post("/payment", PaymentCheckout);
CheckoutRouter.get("/getPayment", getPayment);
export default CheckoutRouter;
