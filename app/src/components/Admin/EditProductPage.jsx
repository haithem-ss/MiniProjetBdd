import React from "react";
import ArrowLeftIcon from "@atlaskit/icon/glyph/arrow-left";
import TrashIcon from "@atlaskit/icon/glyph/trash";
import ProductDescription from "./Assets/ProductDescription";
import CategoryProduct from "./Assets/CategoryProduct";
import ProductColors from "./Assets/ProductColors";
import ProductImages from "./Assets/ProductImages";
import Textfield from "@atlaskit/textfield";
import { useNavigate } from "react-router";

import "../../styles/AdminProduct.css";
const EditProductPage = () => {
  const navigate = useNavigate();
  return (
    <div className="Product__Wraper">
      <div className="Product_header">
        <button
          className="title"
          onClick={() => navigate("/Dashboard/Produits")}
        >
          <div className="title-icon">
            <ArrowLeftIcon size="large" />
          </div>
          Modify Produit
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
          <ProductDescription />
          <h3 className="Product_body_left_title">Catégorie</h3>
          <CategoryProduct />
          <h3 className="Product_body_left_title">Couleurs</h3>
          <ProductColors />
        </div>
        <div className="Product_body_right">
          <h3 className="Product_body_left_title">Image du produit</h3>
          <ProductImages />
          <div className="ProductDescription">
            <h3 className="Product_body_left_title Product_body_righ_header">
              Prix
            </h3>
            <Textfield
              type="number"
              name="basic"
              aria-label="default text field"
              placeholder="Prix"
            />
            <h3 className="Product_body_left_title Product_body_righ_header">
              Quantité
            </h3>
            <Textfield
              name="basic"
              aria-label="default text field"
              placeholder="Quantité"
            />
          </div>
          <div className="Product_body_right_button">
            <button className="btn btn-primary">Enregistrer</button>
            <button className="btn btn-secondary">annuler</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProductPage;
