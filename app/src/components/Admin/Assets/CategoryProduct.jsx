import React, { Fragment, useCallback, useState } from "react";
import "../../../styles/AdminProduct.css";
import Select from "@atlaskit/select";
import Modal from "./Modal";

const CategoryProduct = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="ProductDescription">
      <label htmlFor="single-select-example">catégorie de produit</label>
      <Select
        inputId="single-select-example"
        className="single-select"
        classNamePrefix="react-select"
        options={[
          { label: "Adelaide", value: "adelaide" },
          { label: "Brisbane", value: "brisbane" },
          { label: "Canberra", value: "canberra" },
          { label: "Darwin", value: "darwin" },
          { label: "Hobart", value: "hobart" },
          { label: "Melbourne", value: "melbourne" },
          { label: "Perth", value: "perth" },
          { label: "Sydney", value: "sydney" }
        ]}
        placeholder="Sélectionnez une catégorie"
      />
      <Modal />
    </div>
  );
};

export default CategoryProduct;
