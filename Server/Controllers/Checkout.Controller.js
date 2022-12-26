import express from "express";
import { getDriver } from "../Config/database.js";

export const PaymentCheckout = async (req, res) => {
  try {
    const { cardNumber, expiry, cvc, adress, phone, total, items, user, date } =
      req.body;
    //init driver
    let driver = getDriver();
    const session = driver.session();
    // create user
    const result = await session.executeWrite((tx) =>
      tx.run(
        `
            MATCH (u:User) WHERE u.phoneNumber = "${phone}"
            CREATE (u)-[:HAS_PAYMENT]->(p:Payment {
                amount: "${total} DA",
                cardNumber: "${cardNumber} ",
                expiry: "${expiry}",
                cvc: "${cvc}",
                adress: "${adress}",
                date: "${date}",
                items: "${items}",
                user: "${user}",
                phone: "${phone}"

                })
            `
      )
    );

    res.status(200).json({ msg: "Payment was successful" });
  } catch (error) {
    console.log(error);
  }
};
export const getPayment = async (req, res) => {
  try {
    const { phone } = req.body;
    //init driver
    let driver = getDriver();
    const session = driver.session();
    // create user
    const result = await session.executeWrite((tx) =>
      tx.run(
        `
            MATCH (u:User)-[:HAS_PAYMENT]->(p:Payment) WHERE u.phoneNumber = "${phone}"
            RETURN p
            `
      )
    );
    res.status(200).json({ msg: "Payment was successful" });
  } catch (error) {
    console.log(error);
  }
};

//
// Path: Server\Routes\Checkout.Routes.js