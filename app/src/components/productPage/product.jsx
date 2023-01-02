import React from "react";
import "./product.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";
import ProductCard from "../../assets/ProductCard";
import {motion} from "framer-motion"
import { Toaster } from 'react-hot-toast';
import Spinner from "@atlaskit/spinner"

const Arrow=()=>(
  <svg width="9" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M10.6335 19.7075C10.2285 20.0975 9.57351 20.0975 9.16951 19.7075L0.606667 11.4439C0.41499 11.2618 0.262365 11.0425 0.158073 10.7996C0.0537815 10.5566 0 10.2949 0 10.0305C0 9.76609 0.0537815 9.50443 0.158073 9.26145C0.262365 9.01846 0.41499 8.79923 0.606667 8.61707L9.23151 0.292494C9.42726 0.106451 9.68647 0.00188239 9.95652 2.51676e-05C10.2266 -0.00183205 10.4872 0.0991613 10.6855 0.282495C10.7837 0.37303 10.8623 0.482766 10.9164 0.604907C10.9705 0.727049 10.9989 0.858994 11 0.992574C11.001 1.12615 10.9746 1.25852 10.9224 1.38148C10.8702 1.50445 10.7933 1.61538 10.6965 1.70742L2.80263 9.32404C2.70671 9.41512 2.63033 9.52477 2.57814 9.64631C2.52595 9.76785 2.49903 9.89873 2.49903 10.031C2.49903 10.1633 2.52595 10.2942 2.57814 10.4157C2.63033 10.5372 2.70671 10.6469 2.80263 10.738L10.6335 18.2946C10.7294 18.3856 10.8057 18.4951 10.8579 18.6166C10.9101 18.7381 10.937 18.8689 10.937 19.0011C10.937 19.1332 10.9101 19.264 10.8579 19.3855C10.8057 19.507 10.7294 19.6165 10.6335 19.7075Z" fill="#495057"/>
  </svg>
  
  )
  function getWindowDimensions() {
      const { innerWidth: width, innerHeight: height } = window;
      return {
          width,
          height
      };
  }  

function Slider({recommanded}) {
  const [windowDimensions, setWindowDimensions] = React.useState(getWindowDimensions());
  const [NextElement, setNextElement] = React.useState(undefined)
  const [recommendations]=React.useState(recommanded)
  console.log(recommendations)

  const NbrCardsPerPage = () => {
    console.log(windowDimensions)
    switch (true) {
      case windowDimensions.width <= 1280:
        return 3
      case windowDimensions.width <= 1600:
        return 3
    }
    return 4

  }
  let x = NbrCardsPerPage()

  React.useEffect(()=>{
    if (recommendations.length - x > 0) {
      setNextElement(x)
    } else {
      setNextElement(null)
    }
  },[recommendations])



  const [animation, setAnimation] = React.useState(null)
  const offset = -360
  let scrollAnimationForward = {
    before: {
      x: 0
    }, forward: {
      x: `${offset * (NextElement - x)}px`,
      transition: {
        duration: 0.5
      }
    }, backward: {
      x: `${1 * offset * (NextElement - x)}px`,
      transition: {
        duration: 0.5
      }
    }
  }

  const onClickRigth = () => {

    if (recommendations.length > NextElement && NextElement !== null) {
      setNextElement(NextElement + 1)
    }
    setAnimation(1)


  }
  const onClickLeft = () => {
    setAnimation(0)

    if (x < NextElement) {
      setNextElement(NextElement - 1)
    }
  }


  const TopBar = () => (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center"
      }}
    >
      <h2>Produits pour vous</h2>
      <div
        style={{
          display: "flex",
          gap: "1rem"
        }}>
        <div onClick={onClickLeft} className="Arrow " >
          <Arrow />
        </div>
        <div onClick={onClickRigth} className="Arrow inverted" >
          <Arrow />
        </div>
        {/* <button onClick={onClickRigth}>=</button> */}
      </div>
    </div>
  )


  return (
    <>
      <div>
        <Toaster />
      </div>
      {recommendations.length === 0 ? <>
        <div
          style={{
            width: "100%",
            height: "calc(100vh - 120px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <div>
            <Spinner
              size={"large"}
            />
          </div>
        </div>
      </> : <>
        <section className="section">
          <TopBar />
          <motion.div
            variants={scrollAnimationForward}
            initial={animation === 1 && NextElement !== null ? "before" : "before"}
            animate={animation === 1 && NextElement !== null ? "forward" : (animation === 0 && NextElement !== null ? "backward" : "")}
            className="CardsWrapper">

            {recommendations.map((item) => (
              <ProductCard title={item.properties.ProductName} brand={item.properties.ProductBrand} description={item.properties.ProductDescription} price={item.properties.ProductPrice}></ProductCard>
            ))}
          </motion.div>

        </section>

      </>}

    </>
  )

}


function Product() {
  const { ProductName } = useParams()
  const [product, setProduct] = useState({});
  const [recommended, setRecommanded] = useState([]);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedQte, setSelectedQte] = useState(0);
  useEffect(() => {
    console.log(ProductName)
    axios.get("http://localhost:5000/Products/:productName", { params: { name: ProductName } })
      .then((response) => {
        console.log(response)
        setProduct(response.data.product)
        setRecommanded(response.data.recommanded)
      })
  }, [])
  const handleInc = () => {

    if (selectedQte < parseInt(product.ProductStock)) {
      setSelectedQte(selectedQte + 1);
    }
  };
  const handleDec = () => {
    if (selectedQte > 0) {
      setSelectedQte(selectedQte - 1);
    }
  };
  const stock = {
    Color: "black"
  };

  if (selectedQte === parseInt(product.ProductStock)) {
    stock.Color = "red";
  }

  return (<>
  {recommended.length===0 ? <>Loading</>:<>
      <div className="full">
      {/* <div className="picDiv" style={{backgroundColor:Product.colors[selectedColor]}}></div> */}

      <div className="infoDiv">
        <div className="descriptionDiv">
          <h1>{product.ProductName}</h1>
          <h4>{product.ProductBrand}</h4>
          <p>{product.ProductDescription}</p>
        </div>
        <div className="seperator"></div>
        <div className="priceDiv">
          <h1>{product.ProductPrice} DA</h1>
          <h6>
            Livraison Disponible vers 58 wilayas
          </h6>
        </div>
        <div className="seperator"></div>
        <div className="colorDiv">
          <h1>Choose A color</h1>
          {/* <div className="colorSelectors">
            {product.colors.map((color, index) => {
              if (index === selectedColor) {
                return (
                  <button
                    className="colorSelect"
                    style={{ backgroundColor: color, border: "5px solid blue" }}
                    onClick={() => setSelectedColor(index)}
                  ></button>
                );
              } else
                return (
                  <button
                    className="colorSelect"
                    style={{ backgroundColor: color }}
                    onClick={() => setSelectedColor(index)}
                  ></button>
                );
            })}
            <p>{selectedColor}</p>
          </div> */}
        </div>
        <div className="seperator"></div>
        <div className="quantityDiv">
          <h1>Choose Quantity</h1>
          <div className="quantitySelector">
            <div className="quantiyValue">
              <button className="quantityDecrement" onClick={handleDec}>
                <h1>-</h1>
              </button>
              <input
                className="quantity"
                type="text"
                value={selectedQte}
                style={stock}
                readOnly
              />
              <button className="quantityIncrement" onClick={handleInc}>
                <h1>+</h1>
              </button>
            </div>
            <div className="quantityText">
              <h4 style={stock}>Available Quantity:</h4>
              <h3 style={stock}>{product.ProductStock}</h3>
            </div>
          </div>
        </div>
        <div className="submitionDiv">
          <button className="cartButton">
            <h1>Add To Cart</h1>
          </button>
          <button className="purchaseButton">
            <h1>Purchase</h1>
          </button>
        </div>
      </div>
    </div>
    <Slider recommanded={recommended}/>
    </>
  }

  </>);
}

export default Product;
