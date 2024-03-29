import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getDriver } from "../Config/database.js";
import neo4j, { session } from "neo4j-driver";

//ADD API
// \\ to %

// url: http://localhost:5000/products/addProduct
export const addProduct = async (req, res) => {
  // var productImages = "";
  // var productImages = req.files[0].path;
  // for (var i = 1; i < req.files.length; i++) {
  //   productImages += "," + req.files[i].path;
  // }
  // console.log(productImages);
  // const backslashesRemoved = productImages.replaceAll("\\", "%");
  // console.log(backslashesRemoved);

  const ProductInfos = {
    ProductName: req.body.ProductName,
    ProductDescription: req.body.ProductDescription,
    ProductPrice: req.body.ProductPrice,
    ProductStock: req.body.ProductStock,
    ProductHaveDiscount: req.body.ProductHaveDiscount,
    ProductBrand: req.body.ProductBrand,
    ProductCategory: req.body.ProductCategory,
    // productImagesPaths: productImages,
  };
  console.log(ProductInfos);

  //init driver
  let driver = getDriver();
  const session = driver.session();
  //create Product
  try {
    const result = await session.executeWrite((tx) =>
      tx.run(
        `
            CREATE (p:Product {
              ProductName:"${ProductInfos.ProductName}",
              ProductDescription:"${ProductInfos.ProductDescription}",
              ProductPrice:"${ProductInfos.ProductPrice}",
              ProductStock:"${ProductInfos.ProductStock}",
              ProductHaveDiscount:"${ProductInfos.ProductHaveDiscount}",
              ProductBrand:"${ProductInfos.ProductBrand}",
              productImagesPaths:"null"
            })
            with p
            MATCH(c:Category{categoryName:"${ProductInfos.ProductCategory}"})
            CREATE (p)-[:CategorisedBy]->(c)
          `
      )
    );
    res.status(200).json({ msg: "Product added successfully" });
  } catch (error) {
    //Cant create Category
    //Duplicated Category
    // if (error.code==="Neo.ClientError.Schema.ConstraintValidationFailed"){
    //   console.log("Duplicated Category")
    // }
    console.log(error);
    res.status(400).json({ msg: "Internal error, please try later" });
  } finally {
    await session.close();
  }
};

//DELETE API
export const deleteProduct = async (req, res) => {
  const productToDeleteId = req.params.productId;
  console.log(productToDeleteId);
  //init driver
  let driver = getDriver();
  const session = driver.session();
  //delete Category
  try {
    const result = await session.executeWrite((tx) =>
      tx.run(
        `
          MATCH (p:Product)
          where ID(p) = ${productToDeleteId}
          DETACH DELETE p
        `
      )
    );
    res.status(200).json({
      msg: "Product with Id: " + productToDeleteId + " deleted successfully",
    });
  } catch (error) {
    //Cant create user
    console.log(error);
    res.status(400).json({ msg: "Internal error, please try later" });
  } finally {
    await session.close();
  }
};

//READ API
export const getProducts = async (req, res) => {
  let driver = getDriver();

  const session = driver.session();
  try {
    const result = await session.executeWrite((tx) =>
      tx.run(
        `
          match (p:Product) return(p)
          `
      )
    );
    const response = result.records;
    res.status(200).json({ response });
  } catch (error) {
    //Cant get Categories
    //Duplicated Category
    console.log(error);
    res.status(400).json({ msg: "Internal error, please try later" });
  } finally {
    await session.close();
  }
};
//Read a Product
//READ API
// export const getProduct = async(req, res) => {
//   let driver=getDriver()

//   const session = driver.session();
//   try {
//     const result = await session.executeWrite(
//         tx => tx.run(
//           `
//           match (p:Product)
//           where p.ProductName="${req.params.productName}"
//           return(p)
//           `
//         )
//       )
//       res.status(200).json({result});
//     } catch (error) {
//         //Cant get Categories
//         //Duplicated Category
//         console.log(error)
//         res.status(400).json({msg: "Internal error, please try later"});
//     }finally{
//         await session.close()

//     }
//     }
//to review
//UPDATE API
// url: http://localhost:5000/products/editProduct/:productId
export const editProduct = async (req, res) => {
  // var productImages = "";
  // var productImages = req.files[0].path;
  // for (var i = 1; i < req.files.length; i++) {
  //   productImages += "," + req.files[i].path;
  // }
  // const editedBackslashesRemoved = productImages.replaceAll("\\", "%");
  const editedProductInfos = {
    editedProductName: req.body.ProductName,
    editedProductDescription: req.body.ProductDescription,
    editedProductPrice: req.body.ProductPrice,
    editedProductStock: req.body.ProductStock,
    editedProductHaveDiscount: req.body.ProductHaveDiscount,
    editedProductBrand: req.body.ProductBrand,
    // editedProductImagesPaths: productImages,
  };
  console.log(editedProductInfos);
  //init driver
  let driver = getDriver();
  const session = driver.session();
  //edit Product
  try {
    const result = await session.executeWrite((tx) =>
      tx.run(
        `
          match(p:Product)
          where p.ProductName="${req.params.productName}"
          set 
          p.ProductName = "${editedProductInfos.editedProductName}",
          p.ProductDescription = "${editedProductInfos.editedProductDescription}",
          p.ProductPrice = "${editedProductInfos.editedProductPrice}",
          p.ProductStock = "${editedProductInfos.editedProductStock}",
          p.ProductHaveDiscount = "${editedProductInfos.editedProductHaveDiscount}",
          p.ProductBrand = "${editedProductInfos.editedProductBrand}",
          p.productImagesPaths = "${editedProductInfos.editedProductImagesPaths}"

          `
      )
    );
    res.status(200).json({ msg: "Product modified successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "Internal error, please try later" });
  } finally {
    await session.close();
  }
};
// url: "http://localhost:3000/api/products/recommendation?name=Product 1",
export const getProduct = async (req, res) => {
  //init driver
  let driver = getDriver();
  const session = driver.session();
  try {
    const result = await session.executeWrite((tx) =>
      tx.run(
        `
        match(p:Product{ProductName: "${req.query.name}"})
        match (p)-[:CategorisedBy]->(cat:Category)<-[:CategorisedBy]-(rec:Product)
        match (rec)<-[:Contient]-(:Commande)
        where p.ProductName<>rec.ProductName
        match (cat:Category)<-[:CategorisedBy]-(best:Product)
        where best.ProductName<>p.ProductName
        with  collect(rec)+collect(best) as liste ,p
        unwind liste as products
        return p,collect(distinct products);
      `
      )
    );
    res.status(200).json({
      product: result.records[0]._fields[0].properties,
      recommanded: result.records[0]._fields[1],
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "Internal error, please try later" });
  } finally {
    await session.close();
  }
};
export const gerProductRecommanded = async (req, res) => {
  //init driver
  let driver = getDriver();

  const session = driver.session();
  try {
    const recommanded = await session.executeWrite((tx) =>
      tx.run(
        `
        match (u:User{email:"${req.body.email}"})
        match (u)-[r:Placer]->(c:Commande)-[x:Contient]->(p:Product)
        match (p)<-[Contient]-(w:Commande)<-[z:Placer]-(cli:User)
        match (cli)-[:Placer]->(h:Commande)-[j:Contient]->(rec:Product)
        where cli.id<>u.id
        return rec, count(*) as Frequence order by Frequence Desc 
      `
      )
    );
    const popular = await session.executeWrite((tx) =>
      tx.run(
        `
      match (u:User)
      match (u)-[r:Placer]->(c:Commande)-[x:Contient]->(p:Product)-[:CategorisedBy]->(cat:Category)
      return p, count(*) as Frequence order by Frequence Desc limit 25
    `
      )
    );
    res
      .status(200)
      .json({ recommanded: recommanded.records, popular: popular.records });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "Internal error, please try later" });
  } finally {
    await session.close();
  }
};
