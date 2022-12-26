import React from "react";
import AddCircleIcon from "@atlaskit/icon/glyph/add-circle";
import "../../../styles/AdminProduct.css";
import ProductDescriptionColor from "./ProductDescriptionColor";
const ProductColors = () => {
  const [ColorList, setColorList] = React.useState([]);
  const addBtnClick = () => {
    setColorList(ColorList.concat(<ProductDescriptionColor />));
  };
  return (
    <div
      className="ProductDescription"
      style={{
        height: "150px",
        overflowY: "scroll",
        scrollbars: "none"
      }}
    >
      <ProductDescriptionColor />
      {ColorList}
      <div className="Product_body_left_add">
        <button className="btn-delete" onClick={addBtnClick}>
          <AddCircleIcon size="large" />
        </button>
      </div>
    </div>
  );
};

export default ProductColors;
