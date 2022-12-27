import React from "react";
import "./top.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


function pageTop() {
  return (
    <div className="topDiv" >
      <div className="textDiv">

          <div className="textDiv_top">
            <h3>Discover Our New and Hottest Products</h3>
            <h1>The Best Place To</h1>
            <h1>find and buy</h1>
            <h1>Amazing <span>Products</span></h1>
          </div>
          <button className="textDiv_button">
            <h4>Discover More</h4>
            <FontAwesomeIcon icon="coffee" />
          </button>

          <div className="textDiv_stat">
            <div className="textDiv_stat_product">
              <h1>10k+</h1>
              <h4>products</h4>
            </div>
            <div className="seperator" ></div>
            <div className="textDiv_stat_users">
              <h1>16k</h1>
              <h4>Users</h4>
            </div>

        </div>


      </div>
      <div className="picDiv">
        <img className="picDiv_pic" src={require('../../assets/Group14.png')} />
      </div>

    </div>
  );
}

export default pageTop;