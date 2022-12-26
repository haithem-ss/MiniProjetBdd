import React from "react";
import Heart from "../assets/Heart"
import FilledHeart from "../assets/FilledHeart"
import ProductImage from "./ProductImage.png";

export default function ProductCard({title,brand,description,price}) {
    const [isFavourite, setAsFavourite] = React.useState(false)
    const handleClickFavourite =()=>{
        setAsFavourite(fav=>!fav)
    }
    return (<>
        <div className="ProductCard">
            <div className="ImageWrapper">
                <img src={ProductImage} alt="Image de produit" />
                {isFavourite ? <>
                    <span onClick={handleClickFavourite} className="Heart">
                        <FilledHeart />
                    </span>
                </> :
                    <span onClick={handleClickFavourite} className="Heart">
                        <Heart />
                    </span>}

            </div>
            <div className="InfosWrapper">
                <p className="ProductTitle">{title}</p>
                <p className="ProductCardCatégorie">{brand}</p>
                <p className="ProductCardDescription">{description}</p>
                <div className="CardButtons">
                    <span className="ProductPrice">{price}</span>
                    <button>Ajouter au panier</button>
                </div>
            </div>
        </div>
    </>)

}