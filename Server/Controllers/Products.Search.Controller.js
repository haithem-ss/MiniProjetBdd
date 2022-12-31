import express from "express";
import { getDriver } from "../Config/database.js";

// url: http://localhost:5000/search?value=Electronics
export const searchProducts = async (req, res) => {
  const driver = getDriver();
  const session = driver.session();
  const value = req.query.value;
  const query = `CALL db.index.fulltext.queryNodes("SEARCHPRODUCTINDEX" , "${value}") YIELD node , score
                 RETURN node.ProductName , node.ProductDescription , node.ProductBrand, score
                 ORDER BY score DESC , node.ProductName`;
  try {
    const result = await session.run(query);
    const records = result.records;
    const products = records.map((record) => {
      return {
        ProductName: record.get(0),
        ProductDescription: record.get(1),
        ProductBrand: record.get(2),
        score: record.get(3),
      };
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// url: http://localhost:5000/search/filter?value=Electronics
export const filterProductsByCategory = async (req, res) => {
  const driver = getDriver();
  const session = driver.session();
  const value = req.query.value;
  const query = `MATCH (p:Product)-[:CategorisedBy]->(c:Category)
  WHERE c.categoryName = "${value}"
  RETURN p`;
  try {
    const result = await session.run(query);
    const records = result.records;
    const products = records.map((record) => {
      return {
        ProductName: record.get(0).properties.ProductName,
        ProductDescription: record.get(0).properties.ProductDescription,
        ProductBrand: record.get(0).properties.ProductBrand,
        ProductPrice: record.get(0).properties.ProductPrice,
        ProductImage: record.get(0).properties.ProductImage,
        ProductQuantity: record.get(0).properties.ProductQuantity,
      };
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
