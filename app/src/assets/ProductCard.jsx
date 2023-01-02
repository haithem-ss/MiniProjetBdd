import React from "react";
import Heart from "../assets/Heart";
import FilledHeart from "../assets/FilledHeart";
import ProductImage from "./ProductImage.png";
import toast from "react-hot-toast";
import axios from "axios";
import { addToCart } from "../redux/CartSlice";
import { useDispatch } from "react-redux";

export default function ProductCard({
  title,
  description,
  price,
  user,
  quantity,
  brand,
}) {
  const [isFavourite, setAsFavourite] = React.useState(false);
  const [cardtitle, setTitle] = React.useState(title);
  const ajouterAuFavoris = async () => {
    console.log("infos", {
      firstName: user.firstName,
      productName: cardtitle,
    });
    try {
      const response = await axios.post(
        "http://localhost:5000/favorite/addFavoriteProduct",
        {
          firstName: user.firstName,
          productName: cardtitle,
        }
      );
      console.log("response", response);
    } catch (error) {
      console.log("error", error);
    }
  };
  const supprimerDuFavoris = async () => {
    console.log("infos", {
      firstName: user.firstName,
      productName: cardtitle,
    });
    try {
      const response = await axios.delete(
        "http://localhost:5000/favorite/deleteFavoriteProduct",
        {
          data: {
            firstName: user.firstName,
            productName: cardtitle,
          },
        }
      );
      console.log("response", response);
    } catch (error) {
      console.log("error", error);
    }
  };
  const dispatch = useDispatch();
  const handleClickAddToCart = () => {
    dispatch(
      addToCart({
        img: ProductImage,
        title: title,
        category: brand,
        price: price,
        quantity: quantity,
        date: new Date().toLocaleDateString(),
        isChecked: false,
      })
    );
    toast.success("Produit ajouté au panier");
  };

  //verifier si le produit est un des favouris
  const handleClickFavourite = () => {
    if (isFavourite) {
      setAsFavourite(false);
      supprimerDuFavoris();
      toast.success("Produit supprimé des favoris");
    } else {
      setAsFavourite(true);
      ajouterAuFavoris();
      toast.success("Produit ajouté aux favoris");
    }
  };
  console.log("isFavourite", isFavourite);
  return (
    <>
      <div
        className="ProductCard"
        onClick={() => {
          setTitle(title);
        }}
      >
        <div className="ImageWrapper">
          <img src={ProductImage} alt="Image de produit" />
          {isFavourite ? (
            <>
              <span onClick={handleClickFavourite} className="Heart">
                <FilledHeart />
              </span>
            </>
          ) : (
            <span onClick={handleClickFavourite} className="Heart">
              <Heart />
            </span>
          )}
        </div>
        <div className="InfosWrapper">
          <p className="ProductTitle">{title}</p>
          <p className="ProductCardCatégorie">{brand}</p>
          <p className="ProductCardDescription">{description}</p>
          <div className="CardButtons">
            <span className="ProductPrice">{price} DA</span>
            <button onClick={handleClickAddToCart}>Acheter</button>
          </div>
        </div>
      </div>
    </>
  );
}
