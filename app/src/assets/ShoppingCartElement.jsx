import React from "react";
import "../styles/ShoppingCartDropDown.css";
import Delete from "./Delete.jsx";
import { useDispatch } from "react-redux";
import {
  incrementQuantity,
  decrementQuantity,
  removeItem,
  toggleSelect,
} from "../redux/CartSlice";

const ShoppingCartElement = ({
  syleCss,
  styleCat,
  styleDate,
  styleTrash,
  imageDiv,
  imgStyle,
  styleTitle,
  checkbox,
  infoDiv,
  fun,
  img,
  title,
  category,
  date,
  price,
  quantityStyle,
  quantity = 0,
}) => {
  const dispatch = useDispatch();
  const onDelete = () => {
    dispatch(removeItem(title));
  };
  const onChange = (e) => {
    dispatch(toggleSelect(title));
    fun(e.target.checked);
  };

  return (
    <div className="ShoppingCartElement">
      <input
        className={`checkBox ${checkbox}`}
        type="checkbox"
        name="CarteElement"
        value="CartElement"
        onChange={onChange}
      />
      <div className={`ShoppingCartElement__Image ${imageDiv} `}>
        <img
          className={`${imgStyle}`}
          src={process.env.PUBLIC_URL + `/images/${img}`}
          alt="product"
        />
      </div>
      <div className={`ShoppingCartElement__Info ${syleCss} ${infoDiv}`}>
        <span className={`info__date ${styleDate}`}>{date}</span>
        <h3 className={`info__title ${styleTitle}`}>{title}</h3>
        <span className={`info__category ${styleCat}`}>{category}</span>

        <h3 className="info__price">{price} DA</h3>
        <div className={`cartItem__incrDec ${quantityStyle}`}>
          <button onClick={() => dispatch(decrementQuantity(title))}>-</button>
          <p>{quantity}</p>
          <button onClick={() => dispatch(incrementQuantity(title))}>+</button>
        </div>
        <button
          className={`cartItem__removeButton ${styleTrash}`}
          onClick={onDelete}
        >
          <Delete />
        </button>
      </div>
    </div>
  );
};

export default ShoppingCartElement;
