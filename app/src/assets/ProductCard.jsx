import React from "react";
import Heart from "../assets/Heart"
import FilledHeart from "../assets/FilledHeart"
import ProductImage from "./ProductImage.png";
import toast from 'react-hot-toast';
import { useNavigate } from "react-router";
export default function ProductCard({title,brand,description,price}) {
    let navigate=useNavigate()
    const [isFavourite, setAsFavourite] = React.useState(false)
    //verifier si le produit est un des favouris
    const handleClickFavourite =()=>{
        if (!isFavourite){
            toast.success("Produit ajouté aux favouris")
        }else{
            toast.success("Produit supprimé aux favouris")
        }
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
                <p className="ProductTitle" onClick={()=>{
                    navigate("/Product/"+title)
                    window.location.reload()
                    }}>{title}</p>
                <p className="ProductCardCatégorie">{brand}</p>
                <p className="ProductCardDescription">{description}</p>
                <div className="CardButtons">
                    <span className="ProductPrice">{price} DA</span>
                    <button onClick={()=>{
                        toast.success("Produit ajouté au panier")
                    }}>Acheter</button>
                </div>
            </div>
        </div>
    </>)

}