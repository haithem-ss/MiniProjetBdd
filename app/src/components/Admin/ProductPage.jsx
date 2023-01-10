import React from "react";
import ArrowLeftIcon from "@atlaskit/icon/glyph/arrow-left";
import TrashIcon from "@atlaskit/icon/glyph/trash";
import ProductDescription from "./Assets/ProductDescription";
import CategoryProduct from "./Assets/CategoryProduct";
import ProductColors from "./Assets/ProductColors";
import ProductImages from "./Assets/ProductImages";
import Textfield from "@atlaskit/textfield";
import { useNavigate } from "react-router";
import axios from "axios";

import "../../styles/AdminProduct.css";
const ProductPage = () => {
  const navigate = useNavigate();
  const addProduct = (e) => {
    e.preventDefault();
  };
  const [productName, setProductName] = React.useState("");
  const [productDescription, setProductDescription] = React.useState("");
  const [productCategory, setProductCategory] = React.useState("");
  // const [productColors, setProductColors] = React.useState([]);
  const [productImages, setProductImages] = React.useState([]);
  const [productPrice, setProductPrice] = React.useState("");
  const [productQuantity, setProductQuantity] = React.useState("");
  // console.log("productName1", productName);
  // console.log("productDescription1", productDescription);
  // console.log("productCategory1", productCategory);
  // // console.log("productColors1", productColors);
  // console.log("productImages1", productImages);
  // console.log("productPrice1", productPrice);
  // console.log("productQuantity1", productQuantity);
  const dataSumbit = (e) => {
    e.preventDefault();
    const data = {
      ProductName: productName,
      ProductDescription: productDescription,
      ProductCategory: productCategory,
      // colors: productColors,
      productImages: productImages,
      ProductPrice: productPrice,
      ProductStock: productQuantity,
      ProductBrand: productCategory,
      ProductHaveDiscount: false,
    };
    console.log("data", data);
    axios
      .post("http://localhost:5000/products/addProduct", data)
      .then((res) => {
        console.log("res", res);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  return (
    <form className="Product__Wraper" onSubmit={dataSumbit}>
      <div className="Product_header">
        <button
          className="title"
          onClick={() => navigate("/Dashboard/Produits")}
        >
          <div className="title-icon">
            <ArrowLeftIcon size="large" />
          </div>
          Créer un nouveau produit
        </button>
        <div className="header_button">
          <button className="btn-delete">
            Delete Product <TrashIcon size="small" />
          </button>
        </div>
      </div>

      {/* header finish */}
      <div className="Product_body">
        <div className="Product_body_left">
          <h3 className="Product_body_left_title title_left">
            Description du produit
          </h3>
          <ProductDescription
            setProductName={setProductName}
            setProductDescription={setProductDescription}
          />
          <h3 className="Product_body_left_title">Catégorie</h3>
          <CategoryProduct setProductCategory={setProductCategory} />
          <h3 className="Product_body_left_title">Couleurs</h3>
          <ProductColors />
        </div>
        <div className="Product_body_right">
          <h3 className="Product_body_left_title">Image du produit</h3>
          <ProductImages setProductImages={setProductImages} />
          <div className="ProductDescription">
            <h3 className="Product_body_left_title Product_body_righ_header">
              Prix
            </h3>
            <Textfield
              type="number"
              name="basic"
              aria-label="default text field"
              placeholder="Prix"
              onChange={(e) => {
                setProductPrice(e.target.value);
              }}
            />
            <h3 className="Product_body_left_title Product_body_righ_header">
              Quantité
            </h3>
            <Textfield
              type="number"
              name="basic"
              aria-label="default text field"
              placeholder="Quantité"
              onChange={(e) => {
                setProductQuantity(e.target.value);
              }}
            />
          </div>
          <div className="Product_body_right_button">
            <button className="btn btn-primary" type="submit">
              Enregistrer
            </button>
            <button className="btn btn-secondary">annuler</button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ProductPage;
