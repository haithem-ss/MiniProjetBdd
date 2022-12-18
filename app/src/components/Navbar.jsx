import React, { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../assets/Logo";
import {
  AtlassianNavigation,
  PrimaryButton,
  ProductHome,
  Search,
  Profile
} from "@atlaskit/atlassian-navigation";
import Button from "@atlaskit/button";
import ProfilePic from "../assets/Profile";
import Avatar from "@atlaskit/avatar";
import Heart from "../assets/Heart";
import Cart from "../assets/Cart";
import ShoppingCartDropDown from "../assets/ShoppingCartDropDown";

const CallToAction = isAuth => {
  const [isCartFavoriteDropDownOpen, setIsCartFavoriteDropDownOpen] = useState(
    false
  );
  const [isCartDropDownOpen, setIsCartDropDownOpen] = useState(false);
  const [isActive1, setIsActive1] = useState(false);
  const [isActive2, setIsActive2] = useState(false);

  const renderShoppingCartDropDown = () => {
    setIsActive2(false);
    setIsActive1(!isActive1);
    setIsCartDropDownOpen(!isCartDropDownOpen);
    setIsCartFavoriteDropDownOpen(false);
  };
  const renderShoppingCartFavoriteDropDown = () => {
    setIsActive1(false);
    setIsActive2(!isActive2);
    setIsCartDropDownOpen(false);

    setIsCartFavoriteDropDownOpen(!isCartFavoriteDropDownOpen);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
          gap: "1rem",
          alignItems: "center"
        }}
      >
        {isAuth ? (
          <>
            <Button id="navBarCTA" appearance="primary">
              Se connecter
            </Button>
            <PrimaryButton>S'identifier</PrimaryButton>
          </>
        ) : (
          <>
            <PrimaryButton
              onClick={renderShoppingCartDropDown}
              iconBefore={
                <>
                  <Cart />
                </>
              }
            >
              Panier
            </PrimaryButton>
            {isCartDropDownOpen && (
              <ShoppingCartDropDown
                active={isActive1}
                title="latest added items"
              />
            )}
            <PrimaryButton
              onClick={renderShoppingCartFavoriteDropDown}
              // ref={wrapperRef}
              iconBefore={<Heart />}
            >
              Favoris
            </PrimaryButton>
            {isCartFavoriteDropDownOpen && (
              <ShoppingCartDropDown
                active={isActive2}
                title="Favorite Items"
                favoriteClass="favorite"
              />
            )}
          </>
        )}
      </div>
    </>
  );
};

const SearchBar = () => {
  const [value, setValue] = React.useState("");
  const onChange = event => {
    console.log("search clicked with value: ", event.target.value);
    setValue(event.target.value);
  };

  return (
    <Search
      onClick={onChange}
      placeholder="Rechercher un produit"
      tooltip="Search"
      label="Search"
      value={value}
    />
  );
};
const NavBar = () => (
  <AtlassianNavigation
    label="site"
    renderSearch={SearchBar}
    renderSignIn={() => CallToAction(false)}
    renderProfile={() => (
      <Profile
        onClick={() => console.log("Clicked")}
        icon={<Avatar size="small" src={"../assets/Profile.jpg"} />}
        tooltip="Your profile and settings"
      />
    )}
    renderProductHome={() => (
      <ProductHome href="#" siteTitle="Eden shop" icon={Logo} logo={Logo} />
    )}
    primaryItems={[
      <PrimaryButton>
        <NavLink to="/">Home</NavLink>
      </PrimaryButton>,
      <PrimaryButton>
        <NavLink to="/">About</NavLink>
      </PrimaryButton>,
      <PrimaryButton>
        <NavLink to="/">Contact</NavLink>
      </PrimaryButton>
    ]}
  />
);

export default NavBar;
