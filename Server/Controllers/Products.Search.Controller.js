import express from "express";
import { getDriver } from "../Config/database.js";

// url : http://localhost:5000/search?value=Electronics
export const search = async (req, res) => {
  const driver = getDriver();
  const session = driver.session();
  const value = req.query.value;
  const query = `CALL db.index.fulltext.queryNodes("SEARCHPRODUCTINDEX" , "${value}") YIELD node , score
  MATCH (node)-[:CategorisedBy]->(c:Category)
  RETURN node.ProductName ,c.categoryName, node.ProductDescription , node.ProductBrand,node.ProductPrice , node.ProductStock , node.productImagesPaths  ORDER BY score DESC , node.ProductName`;
  try {
    const result = await session.run(query);
    const records = result.records;
    const products = records.map((record) => {
      return {
        ProductName: record.get(0),
        productCategory: record.get(1),
        ProductDescription: record.get(2),
        ProductBrand: record.get(3),
        ProductPrice: record.get(4),
        ProductImage: record.get(6),
        ProductQuantity: record.get(5),
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
        productCategory: record.get(0).properties.productCategory,
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
