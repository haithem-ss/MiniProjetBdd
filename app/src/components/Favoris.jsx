import React, { useEffect, useCallback, useState } from "react";
import "../styles/CartItems.css";
import ShoppingCartElement from "../assets/ShoppingCartElement.jsx";
import ChevronDownIcon from "@atlaskit/icon/glyph/chevron-down";
import Sort from "../assets/Sort";
import axios from "axios";
const Favoris = ({ user }) => {
  const [favoriteItems, setFavoriteItems] = useState([]);
  console.log("user Favorite items", user);
  useEffect(() => {
    const favoriteProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/favorite/getFavoriteProducts?firstName=${user.firstName}`
        );
        const deleteDuplicates = (arr) => {
          if (arr.length === 0) return [];
          let unique = [arr[0]];
          for (let i = 1; i < arr.length; i++) {
            if (arr[i].title !== unique[unique.length - 1].title) {
              unique.push(arr[i]);
            }
          }
          return unique;
        };
        const uniqueArray = deleteDuplicates(response.data);
        setFavoriteItems(uniqueArray);
      } catch (error) {
        console.log("error", error);
      }
    };
    favoriteProducts();
  }, [user]);
  console.log("favoriteItems", favoriteItems);
  const [isChecked, setIsChecked] = useState(false);
  const [btnValidateTrash, setBtnValidateTrash] = useState("");
  const [isRenderDelete, setIsRenderDelete] = useState(false);
  const [filterbtn, setFilterbtn] = useState("");

  const [value, setValue] = useState("");
  const onChange = (event) => {
    setValue(event.target.value);
  };
  const sortByPrice = () => {
    const sorted = [...favoriteItems].sort((a, b) => {
      return a.price - b.price;
    });
    setFavoriteItems(sorted);
    console.log("pRICE ssorted", sorted);
    setFilterbtn("filterbtn");
  };
  const sortByDate = () => {
    const sorted = [...favoriteItems].sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });
    setFavoriteItems(sorted);
    console.log("DATE ssorted", sorted);
    setFilterbtn("filterbtn");
  };

  return (
    <div className="ShoppingCart__wraper">
      <div className="ShoppingCart__header">
        <h2 className="title">Mes Produits Favoris</h2>
      </div>
      <div className="ShoppingCart__header2">
        <div className="filter">
          <span className="Sort">
            Sort
            <Sort />
          </span>
          <button className={`Price ${filterbtn}`} onClick={sortByPrice}>
            Price
            <ChevronDownIcon className="arrowIcon" label="" />
          </button>
          <button className="Date" onClick={sortByDate}>
            Date
            <ChevronDownIcon className="arrowIcon" label="" />
          </button>
          <button className="Category">
            Category
            <ChevronDownIcon className="arrowIcon" label="" />
          </button>
        </div>
      </div>
      <div className="ShoppingCart__items">
        {favoriteItems.map((item) => (
          <ShoppingCartElement
            syleCss="ShoppingCartElement__Info__CartItems"
            styleTitle="product__title__style"
            styleCat="info__category__style"
            styleDate="info__date__style"
            styleTrash="removeBtn__display"
            imageDiv="ShoppingCartElement__Image__style"
            imgStyle="image__style"
            quantityStyle="quantity__style"
            img={item.product.ProductImage}
            title={item.product.ProductName}
            category={item.product.ProductBrand}
            price={item.product.ProductPrice}
            date={new Date().toLocaleDateString()}
          />
        ))}
      </div>
    </div>
  );
};

export default Favoris;
// [0].product.ProductBrand
// ProductBrand
// :
// "Apple"
// ProductDescription
// :
// "SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ..."
// ProductName
// :
// "iPhone X"
// ProductPrice
// :
// "899"
// ProductStock
// :
// "34"
