import React, { Fragment, useCallback, useEffect, useState } from "react";
import "../../../styles/AdminProduct.css";
import Select from "@atlaskit/select";
import Modal from "./Modal";
import axios from "axios";
import Spinner from "@atlaskit/spinner";

const CategoryProduct = ({ setProductCategory }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = React.useState([]);
  const [categoryNames, setCategoryNames] = React.useState([]);

  React.useEffect(() => {
    const getCategories = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/categories`
      );
      console.log("res", res.data);
      setCategories(res.data.cats);
    };
    getCategories();
  }, []);
  useEffect(() => {
    try {
      const categoryNames = categories.map((category) => {
        return {
          label: category._fields[0].properties.categoryName,
          value: category._fields[0].properties.categoryName,
        };
      });
      const uniqueCategoryNames = [...new Set(categoryNames)];
      console.log("categoryNames", categoryNames);
      if (categoryNames.length > 0) {
        setIsLoading(false);
        setCategoryNames(uniqueCategoryNames);
      }
    } catch (error) {
      console.log("error", error);
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
            className="select"
            classNamePrefix="select"
            id="single-select-example"
            isSearchable
            name="single-select-example"
            options={categoryNames}
            onChange={(e) => {
              // console.log("e", e.value);
              setProductCategory(e.value);
            }}
          />

          <Modal />
        </>
      )}
    </div>
  );
};

export default CategoryProduct;
