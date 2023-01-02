import React, { useState, useEffect, useRef } from "react";
import "../styles/ShoppingCartDropDown.css";
import ShoppingCartElement from "../assets/ShoppingCartElement";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import axios from "axios";

const ShoppingCartDropDown = ({ active, title, favoriteClass = "", user }) => {
  const [favoriteItems, setFavoriteItems] = useState([]);
  console.log("user in favorite cart", user);
  useEffect(() => {
    const favoriteProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/favorite/getFavoriteProducts",
          {
            firstName: user.firstName,
          }
        );
        setFavoriteItems(response.data);
        console.log("response", response);
      } catch (error) {
        console.log("error", error);
      }
    };
    favoriteProducts();
  }, []);
  console.log("favoriteItems", favoriteItems);
  const navigate = useNavigate();
  const [isclickedOutside, setIsClickedOutside] = useState(false);
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);
  function useOutsideAlerter(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        console.log(ref.current);
        if (ref.current && !ref.current.contains(event.target)) {
          setIsClickedOutside(true);
          console.log("clicked outside");
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }
  const cart = useSelector((state) => state.cart);
  console.log("cart", cart);
  return (
    <>
      {!isclickedOutside ? (
        <div
          className={active ? `DropDownContainer fadeIn ${favoriteClass}` : ""}
          ref={wrapperRef}
        >
          <div className="DropDownContainer__Header">
            <h3 className="header added-items">{title}</h3>
            <h3
              className="header view-cart"
              onClick={() => {
                navigate("/CartItems");
              }}
            >
              view all
            </h3>
          </div>
          <div className="DropDownContainer__Body">
            {title === "Favorite Items"
              ? favoriteItems.map((item) => (
                  <ShoppingCartElement
                    key={item._id}
                    id={item._id}
                    title={item.title}
                    price={item.price}
                    image={item.image}
                    quantity={item.quantity}
                    favoriteClass={favoriteClass}
                  />
                ))
              : cart.map((item) => (
                  <ShoppingCartElement
                    syleCss="ShoppingCartElement__Info__width"
                    styleCat=""
                    styleDate=""
                    styleTrash="ShoppingCartElement__Info__trash"
                    img={item.img}
                    title={item.title}
                    category={item.category}
                    date={item.date}
                    price={item.price}
                    quantity={item.quantity}
                  />
                ))}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ShoppingCartDropDown;
