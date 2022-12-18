import "./product.css";
import { useState } from "react";



function Product() {
  const [productSpecs]=useState({
    title:"Jacket For Winter",
    brand:"Timberland",
    description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, non ab hic facilis harum, quam deleniti et dignissimos ullam, tempora unde suscipit veniam eos quod numquam eaque ipsum porro fuga?",
    price:(19000).toLocaleString('en-US'),
    deliveryDestinations:56,
    colors:['#8E8162','#5A5E43','#2B2B2B','#3D4255'],
    availableQte:6
    })
    const [selectedColor,setSelectedColor]=useState(0);
    const [selectedQte,setSelectedQte]=useState(0);
    
    const handleInc=()=>{
      if (selectedQte<productSpecs.availableQte){
          setSelectedQte(selectedQte+1);
      }
      

    }
    const handleDec=()=>{
      if (selectedQte>0){
        setSelectedQte(selectedQte-1);
      
    }}
    const stock={
      Color:"black"
    }
    if (selectedQte===productSpecs.availableQte){
      stock.color="red"
      
    }
   
    
  return (
    <div className="full">
      <div className="picDiv"></div>
      
      <div className="infoDiv">
          <div className="descriptionDiv">

            <h1>{productSpecs.title}</h1>
            <h4>{productSpecs.brand}</h4>
            <p>{productSpecs.description}</p>
          </div>
          <div className="seperator"></div>
          <div className="priceDiv">
            <h1>{productSpecs.price} DA</h1>
            <h6>Livraison Disponible vers {productSpecs.deliveryDestinations} wilaya </h6>
          </div>
          <div className="seperator"></div>
          <div className="colorDiv">
            <h1>Choose A color</h1>
            <div className="colorSelectors">
              {productSpecs.colors.map((color,index)=>{
                if (index===selectedColor){return <button className="colorSelect" style={{backgroundColor:color, border: "5px solid blue"}} onClick= {() => setSelectedColor(index) } ></button>}
                else
                return <button className="colorSelect" style={{backgroundColor:color}} onClick= {() => setSelectedColor(index) }></button>})}
                <p>{selectedColor}</p>
            </div>
          </div>
          <div className="seperator"></div>
          <div className="quantityDiv">
            <h1>Choose Quantity</h1>
            <div className="quantitySelector">
              <div className="quantiyValue">
                  <button className="quantityDecrement" onClick={handleDec} ><h1>-</h1></button>
                  <input className="quantity" type="text" value={selectedQte} style={stock} readOnly />
                  <button className="quantityIncrement" onClick={handleInc}><h1>+</h1></button>

              </div>
              <div className="quantityText">
              <h4 style={stock}>Available Quantity:</h4>
              <h3 style={stock}>{productSpecs.availableQte}</h3>
              </div>
            </div>
          </div>
          <div className="submitionDiv">
            <button className="cartButton"><h1>Add To Cart</h1></button>
            <button className="purchaseButton"><h1>Purchase</h1></button>
          </div>
      </div>
    </div>
  );
}

export default Product;