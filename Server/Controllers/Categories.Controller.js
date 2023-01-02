import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getDriver } from "../Config/database.js";
import neo4j, { session } from "neo4j-driver";

//ADD API
export const addCategory = async (req, res) => {
  const categoryInfos = {
    categoryName: req.body.categoryName,
    categoryDescription: req.body.categoryDescription,
  };
  console.log(categoryInfos);
  //init driver
  let driver = getDriver();
  const session = driver.session();
  //create Category
  try {
    const result = await session.executeWrite((tx) =>
      tx.run(
        `
            CREATE (u:Category {
              categoryName: "${categoryInfos.categoryName}",
              categoryDescription: "${categoryInfos.categoryDescription}"
            })
          `
      )
    );
    res.status(200).json({ msg: "Category added successfully" });
  } catch (error) {
    //Cant create Category
    //Duplicated Category
    if (error.code === "Neo.ClientError.Schema.ConstraintValidationFailed") {
      console.log("Duplicated Category");
    }
    console.log(error);
    res.status(400).json({ msg: "Internal error, please try later" });
  } finally {
    await session.close();
  }
};

//DELETE API
export const deleteCategory = async (req, res) => {
  const categoryToDeleteName = req.params.categoryName;
  console.log(categoryToDeleteName);
  //init driver
  let driver = getDriver();
  const session = driver.session();
  //delete Category
  try {
    const result = await session.executeWrite((tx) =>
      tx.run(
        `
          MATCH (u:Category)
          where u.categoryName = "${categoryToDeleteName}"
          DELETE u
        `
      )
    );
    res
      .status(200)
      .json({
        msg: "Category " + categoryToDeleteName + " deleted successfully",
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
// url: http://localhost:5000/categories
export const getCategories = async (req, res) => {
  let driver = getDriver();

  const session = driver.session();
  try {
    const result = await session.executeWrite((tx) =>
      tx.run(
        `
          match (u:Category) return(u)
          `
      )
    );
    res.status(200).json({ cats:result.records});
  } catch (error) {
    //Cant get Categories
    //Duplicated Category
    console.log(error);
    res.status(400).json({ msg: "Internal error, please try later" });
  } finally {
    await session.close();
  }
};

//UPDATE API
export const editCategory = async (req, res) => {
  const categoryInfos = {
    categoryName: req.params.categoryName,
    editedCategoryName: req.body.editedCategoryName,
    editedCategoryDescription: req.body.editedCategoryDescription,
  };
  console.log(categoryInfos);
  //init driver
  let driver = getDriver();
  const session = driver.session();
  //edit Category
  try {
    const result = await session.executeWrite((tx) =>
      tx.run(
        `
          match(c:Category {
            categoryName: "${categoryInfos.categoryName}"
             })
          set 
          c.categoryName = "${categoryInfos.editedCategoryName}",
          c.categoryDescription= "${categoryInfos.editedCategoryDescription}"
          `
      )
    );
    res.status(200).json({ msg: "Category modified successfully" });
  } catch (error) {
    //Cant update Category
    if (error.code === "Neo.ClientError.Schema.ConstraintValidationFailed") {
      console.log("Duplicated Category");
    }
    console.log(error);
    res.status(400).json({ msg: "Internal error, please try later" });
  } finally {
    await session.close();
  }
};
