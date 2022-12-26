import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getDriver } from "../Config/database.js";
import neo4j, { session } from 'neo4j-driver'


//ADD API
export const addProduct= async(req,res)=>{
    const ProductInfos={
        ProductName:req.body.ProductName,
        ProductDescription:req.body.ProductDescription,
        ProductPrice:req.body.ProductPrice,
        ProductStock:req.body.ProductStock,
        ProductHaveDiscount:req.body.ProductHaveDiscount,
        ProductBrand:req.body.ProductBrand,
        ProductCategory:req.body.ProductCategory,
    }
    console.log(ProductInfos)
    //init driver
    let driver=getDriver()
    const session = driver.session()
    //create Product
    try {
    const result = await session.executeWrite(
        tx => tx.run(
          `
            CREATE (p:Product {
              ProductName:"${ProductInfos.ProductName}",
              ProductDescription:"${ProductInfos.ProductDescription}",
              ProductPrice:"${ProductInfos.ProductPrice}",
              ProductStock:"${ProductInfos.ProductStock}",
              ProductHaveDiscount:"${ProductInfos.ProductHaveDiscount}",
              ProductBrand:"${ProductInfos.ProductBrand}"
            })
            with p
            MATCH(c:Category{categoryName:"${ProductInfos.ProductCategory}"})
            CREATE (p)-[:CategorisedBy]->(c)
          `
        )
      )
        res.status(200).json({msg: "Product added successfully"});
    } catch (error) {
        //Cant create Category
        //Duplicated Category
        // if (error.code==="Neo.ClientError.Schema.ConstraintValidationFailed"){
        //   console.log("Duplicated Category")
        // }
        console.log(error)
        res.status(400).json({msg: "Internal error, please try later"});
    }finally{
        await session.close()

    }
}

//DELETE API
export const deleteProduct= async(req,res)=>{
  const productToDeleteId=req.params.productId;
  console.log(productToDeleteId);
  //init driver
  let driver=getDriver()
  const session = driver.session()
  //delete Category
  try {
  const result = await session.executeWrite(
      tx => tx.run(
        `
          MATCH (p:Product)
          where ID(p) = ${productToDeleteId}
          DETACH DELETE p
        `
      )
    )
      res.status(200).json({msg: "Product with Id: "+productToDeleteId+" deleted successfully"});
  } catch (error) {
      //Cant create user
      console.log(error)
      res.status(400).json({msg: "Internal error, please try later"});
  }finally{
      await session.close()

  }
}

//READ API
export const getProducts = async(req, res) => {
  let driver=getDriver()

  const session = driver.session();
  try {
    const result = await session.executeWrite(
        tx => tx.run(
          `
          match (p:Product) return(p)
          `
        )
      )
      res.status(200).json({result});
    } catch (error) {
        //Cant get Categories
        //Duplicated Category
        console.log(error)
        res.status(400).json({msg: "Internal error, please try later"});
    }finally{
        await session.close()
  
    }
    }

  //UPDATE API 
  export const editProduct= async(req,res)=>{
    const editedProductInfos={
        editedProductName:req.body.ProductName,
        editedProductDescription:req.body.ProductDescription,
        editedProductPrice:req.body.ProductPrice,
        editedProductStock:req.body.ProductStock,
        editedProductHaveDiscount:req.body.ProductHaveDiscount,
        editedProductBrand:req.body.ProductBrand,
    }
    console.log(editedProductInfos)
    //init driver
    let driver=getDriver()
    const session = driver.session()
    //edit Category
    try {
    const result = await session.executeWrite(
        tx => tx.run(
          `
          match(p:Product)
          where ID(p)=${req.params.productId}
          set 
          p.ProductName = "${editedProductInfos.editedProductName}",
          p.ProductDescription = "${editedProductInfos.editedProductDescription}",
          p.ProductPrice = "${editedProductInfos.editedProductPrice}",
          p.ProductStock = "${editedProductInfos.editedProductStock}",
          p.ProductHaveDiscount = "${editedProductInfos.editedProductHaveDiscount}",
          p.ProductBrand = "${editedProductInfos.editedProductBrand}"
          `
        )
      )
        res.status(200).json({msg: "Product modified successfully"});
    } catch (error) {
        //Cant update Category
        // if (error.code==="Neo.ClientError.Schema.ConstraintValidationFailed"){
        //   console.log("Duplicated Category")
        // }
        console.log(error)
        res.status(400).json({msg: "Internal error, please try later"});
    }finally{
        await session.close()

    }
}