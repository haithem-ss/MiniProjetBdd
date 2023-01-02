import express from "express";
import { getDriver } from "../Config/database.js";

// url: http://localhost:5000/favorite/addFavoriteProduct
export const addFavoriteProduct = async (req, res) => {
  const session = getDriver().session();
  const { productName, firstName } = req.body;
  try {
    const result = await session.run(
      `MATCH (p:Product {ProductName:"${productName}"}), (u:User {firstName: "${firstName}"})
            MERGE (u)-[r:FAVORITE]->(p)
            RETURN p , u ,r`,
      { productName, firstName }
    );
    const product = result.records.map((record) => record.get(0).properties);
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
  session.close();
};

// url: http://localhost:5000/favorite/getFavoriteProducts
export const getFavoriteProducts = async (req, res) => {
  const session = getDriver().session();
  const { firstName } = req.body;
  try {
    const result = await session.run(
      `MATCH (u:User {firstName: $firstName})-[r:FAVORITE]->(p:Product)
            RETURN p
            `,
      { firstName }
    );
    const products = result.records.map((record) => record.get(0).properties);
    res.status(200).json(products);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
  session.close();
};

// url: http://localhost:5000/favorite/deleteFavoriteProduct
export const deleteFavoriteProduct = async (req, res) => {
  const session = getDriver().session();
  const { productName, firstName } = req.body;
  try {
    const result = await session.run(
      `MATCH (u:User {firstName: "${firstName}"})-[r:FAVORITE]->(p:Product {ProductName: "${productName}"})
                DELETE r
                `,
      { productName, firstName }
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
  session.close();
};
