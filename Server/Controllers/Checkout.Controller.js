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
    for (let i = 0; i < items.length; i++) {
      const result = await session.executeWrite((tx) =>
        tx.run(
          `MATCH (u:User) WHERE u.email = "${user.email}"
          MATCH (p:Product) WHERE p.ProductName = "${items[i]}"
          CREATE (u)-[:Placer]->(c:Commande{
            cardNumber:"${cardNumber}",
            expiry:"${expiry}",
            cvc:"${cvc}",
            adress:"${adress}",
            phone:"${phone}",
            total:"${total}",
            date:"${date}",
            user:"${user.firstName} ${user.lastName}"
          })-[:Contient]->(p)
          RETURN u , p ,c
          `
        )
      );
    }

    res.status(200).json({ msg: "Payment was successful" });
  } catch (error) {
    console.log(error);
  }
};
export const getPayment = async (req, res) => {
  try {
    const { email } = req.body;
    //init driver
    let driver = getDriver();
    const session = driver.session();
    // create user
    const result = await session.executeWrite((tx) =>
      tx.run(
        `
        MATCH (u:User)-[:Placer]->(c:Commande)-[:Contient]->(p:Product)
        WHERE u.email = "${email}"
        RETURN u , p ,c

            `
      )
    );
    res.status(200).json({ msg: "Payment was successful" });
  } catch (error) {
    console.log(error);
  }
};
export const getPayments = async (req, res) => {
  try {
    //init driver
    let driver = getDriver();
    const session = driver.session();
    // create user
    const result = await session.executeWrite((tx) =>
      tx.run(
        `
        MATCH (u:User)-[:Placer]->(c:Commande)-[:Contient]->(p:Product) 
        RETURN c,u.firstName+" "+u.lastName,count(p)as NoombreProduit
            `
      )
    );
    res.status(200).json({commandes: result.records});
  } catch (error) {
    console.log(error);
  }
};

//
// Path: Server\Routes\Checkout.Routes.js
