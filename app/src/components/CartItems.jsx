import React, { ChangeEvent, useCallback, useState } from "react";
import "../styles/CartItems.css";
import ShoppingCartElement from "../assets/ShoppingCartElement.jsx";
import ChevronDownIcon from "@atlaskit/icon/glyph/chevron-down";
import { AtlassianNavigation, Search } from "@atlaskit/atlassian-navigation";
import Sort from "../assets/Sort";
import Arrow from "../assets/Arrow.jsx";
import Trash from "../assets/Trash";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  removeSelectedItems,
  filterByCategory,
  sortCartByPrice,
  sortByDate
} from "../redux/CartSlice.js";
const CartItems = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = useState(false);
  const [btnValidateTrash, setBtnValidateTrash] = useState("");
  const [isRenderDelete, setIsRenderDelete] = useState(false);
  const [filterbtn, setFilterbtn] = useState("");
  const onChange2 = event => {
    setIsChecked(event.target.checked);
    console.log(event.target);
    if (event.target.checked) {
      setBtnValidateTrash("btn-validate__trash");
    } else {
      setBtnValidateTrash("");
    }
  };
  const deleteSelectedCheckboxes = () => {
    dispatch(removeSelectedItems());
  };
  const pull_selectedCheckBox = checkbox => {
    console.log(checkbox);
    if (checkbox) {
      setIsChecked(true);
      setBtnValidateTrash("btn-validate__trash");
    } else {
      setIsChecked(false);
      setBtnValidateTrash("");
    }
  };
  const getTotal = () => {
    let totalPrice = 0;
    cart.forEach(item => {
      totalPrice += item.price * item.quantity;
    });
    return totalPrice;
  };

  const [value, setValue] = useState("");
  const onChange = event => {
    setValue(event.target.value);
  };
  const cart = useSelector(state => state.cart);
  const [priceSort, setPriceSort] = useState(false);
  const [sortedCart, setSortedCart] = useState(cart);
  const onSortByPrice = () => {
    setFilterbtn("btn_clicked");
    setPriceSort(!priceSort);
    dispatch(sortCartByPrice());
  };
  const onRemoveSelectedItems = () => {
    dispatch(removeSelectedItems());
  };
  return (
    <div className="ShoppingCart__wraper">
      <div className="ShoppingCart__header">
        <h2 className="title">Cart items</h2>
        <div className="Total__Trash">
          {isChecked ? (
            <button className="Trash" onClick={deleteSelectedCheckboxes}>
              <Trash />
            </button>
          ) : null}
          {!isChecked ? (
            <h2 className="total">Total: {getTotal().toLocaleString()} DA</h2>
          ) : null}
        </div>
        <button className={`btn-validate ${btnValidateTrash}`}>validate</button>
      </div>
      <div className="ShoppingCart__header2">
        <div className="filter">
          <span className="Sort">
            Sort
            <Sort />
          </span>
          <button className={`Price ${filterbtn}`} onClick={onSortByPrice}>
            Price
            <ChevronDownIcon className="arrowIcon" label="" />
          </button>
          <button className="Date">
            Date
            <ChevronDownIcon className="arrowIcon" label="" />
          </button>
          <button className="Category">
            Category
            <ChevronDownIcon className="arrowIcon" label="" />
          </button>
        </div>
        <div className="search">
          <button
            className="Historique"
            onClick={() => {
              navigate("/History");
            }}
          >
            <Arrow />
            Historique d’achats
          </button>
          <Search
            onClick={onChange}
            placeholder="Search..."
            tooltip="Search"
            label="Search"
            value={value}
            style={{ width: "300px" }}
          />
        </div>
      </div>
      <div className="ShoppingCart__items">
        {cart.map(item => {
          return (
            <div className="ShoppingCart__item">
              <ShoppingCartElement
                syleCss="ShoppingCartElement__Info__CartItems"
                styleTitle="product__title__style"
                styleCat="info__category__style"
                styleDate="info__date__style"
                styleTrash="removeBtn__display"
                imageDiv="ShoppingCartElement__Image__style"
                imgStyle="image__style"
                checkbox="checkBoxDisplay"
                fun={pull_selectedCheckBox}
                img={item.img}
                title={item.title}
                category={item.category}
                date={item.date}
                price={item.price}
                quantity={item.quantity}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CartItems;
