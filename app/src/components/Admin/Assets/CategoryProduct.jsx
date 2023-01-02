import React, { Fragment, useCallback, useEffect, useState } from "react";
import "../../../styles/AdminProduct.css";
import Select from "@atlaskit/select";
import Modal from "./Modal";
import axios from "axios";
import Spinner from "@atlaskit/spinner";

const CategoryProduct = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = React.useState([]);
  const [categoryNames, setCategoryNames] = React.useState([]);

  React.useEffect(() => {
    const getCategories = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/categories`
      );
      setCategories(res.data);
    };
    getCategories();
  }, []);

  useEffect(() => {
    try {
      const categoryNames = categories.result.records.map((category) => {
        return {
          label: category._fields[0].properties.categoryName,
          value: category._fields[0].properties.categoryName,
        };
      });
      setCategoryNames(categoryNames);
      console.log(categoryNames);
      if (categories) {
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  }, [categories]);

  const [isOpen, setIsOpen] = useState(false);
  console.log("categoryNames2", categoryNames);
  return (
    <div className="ProductDescription">
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <label htmlFor="single-select-example">catégorie de produit</label>
          <Select
            inputId="single-select-example"
            className="single-select"
            classNamePrefix="react-select"
            options={categoryNames}
            placeholder="Sélectionnez une catégorie"
          />
          <Modal />
        </>
      )}
    </div>
  );
};

export default CategoryProduct;
