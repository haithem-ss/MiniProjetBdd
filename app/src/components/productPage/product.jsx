import React from "react";
import "./product.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


function Product() {
  return (
    <div className="full">
      <div className="picDiv"></div>
      <div className="infoDiv">
          <div className="descriptionDiv">
            <h1>Jacket For Winter</h1>
            <h4>TimberLand</h4>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, non ab hic facilis harum, quam deleniti et dignissimos ullam, tempora unde suscipit veniam eos quod numquam eaque ipsum porro fuga?</p>
          </div>
          <div className="seperator"></div>
          <div className="priceDiv">
            <h1>19,000 DA</h1>
            <h6>Livraison Disponible ver 56 wilaya </h6>
          </div>
          <div className="seperator"></div>
          <div className="colorDiv">
            <h1>Choose A color</h1>
            <div className="colorSelectors">
              <button className="colorSelect"></button>
              <button className="colorSelect"></button>
              <button className="colorSelect"></button>
              <button className="colorSelect"></button>
            </div>
          </div>
          <div className="seperator"></div>
          <div className="quantityDiv">
            <h1>Choose Quantity</h1>
            <div className="quantitySelector">
              <div className="quantiyValue">
                  <button className="quantityDecrement">-</button>
                  <input className="quantity" type="text" readOnly />
                  <button className="quantityIncrement">+</button>

              </div>
              <div className="quantityText">
              <h4>Available Quantity:</h4>
              <h3>06 pieces</h3>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
}

export default Product;