import React, { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import Logo from "../assets/Logo";
import {
  AtlassianNavigation,
  PrimaryButton,
  ProductHome,
  Search,
  Profile,
} from "@atlaskit/atlassian-navigation";
import DropdownMenu, {
  DropdownItem,
  DropdownItemGroup,
} from "@atlaskit/dropdown-menu";
import { motion } from "framer-motion";
import Button from "@atlaskit/button";
import ProfilePic from "../assets/Profile";
import Avatar from "@atlaskit/avatar";
import Heart from "../assets/Heart";
import Cart from "../assets/Cart";
import ShoppingCartDropDown from "../assets/ShoppingCartDropDown";
import axios from "axios";
const Option = ({ userInfos }) => {
  const [open, isOpen] = React.useState(false);
  const wrapperRef = useRef(null);
  const [isclickedOutside, setIsClickedOutside] = useState(false);
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
  const ToggleDropDown = () => {
    isOpen(!open);
  };
  return (
    <>
      <button className="dropdown" onClick={ToggleDropDown}>
        <Avatar size="small" src={"../assets/Profile.jpg"} />
      </button>
      {isclickedOutside ? (
        <motion.div
          className="dropdown-content"
          ref={wrapperRef}
          initial={{
            opacity: 0,
            display: "none",
            // y:"calc( 9vh + 56px )",
            x: "clamp(200px,12vw,1vw)",
          }}
          animate={
            open
              ? {
                  display: "block",
                  opacity: 1,
                  transition: {
                    duration: 0.25,
                  },
                }
              : {}
          }
        >
          <span>
            Bienvenue
            <span
              style={{
                fontWeight: 600,
                marginInline: 5,
              }}
            >
              {userInfos.firstName} {userInfos.lastName}
            </span>
          </span>
        </motion.div>
      ) : null}
      <motion.div
        className="dropdown-content"
        ref={wrapperRef}
        initial={{
          opacity: 0,
          display: "none",
          // y:"calc( 9vh + 56px )",
          x: "clamp(200px,12vw,1vw)",
        }}
        animate={
          open
            ? {
                display: "block",
                opacity: 1,
                transition: {
                  duration: 0.25,
                },
              }
            : {}
        }
      >
        <span>
          Bienvenue
          <span
            style={{
              fontWeight: 600,
              marginInline: 5,
            }}
          >
            {userInfos.firstName} {userInfos.lastName}
          </span>
        </span>
      </motion.div>
    </>
  );
};
const CallToAction = (isAuth) => {
  const [isCartFavoriteDropDownOpen, setIsCartFavoriteDropDownOpen] =
    useState(false);
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
          alignItems: "center",
        }}
      >
        {isAuth ? (
          <>
            <Button id="navBarCTA" appearance="primary">
              <NavLink to="/Login">Se connecter</NavLink>
            </Button>
            <PrimaryButton>
              <NavLink to="/Register">S'identifier</NavLink>
            </PrimaryButton>
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
  const navigate = useNavigate();
  const [searchedItems, setSearchedItems] = useState([]);
  const [value, setValue] = React.useState("");
  const onChange = (event) => {
    console.log("search clicked with value: ", event.target.value);
    setValue(event.target.value);
    axios
      .get(`http://localhost:5000/search?value=${event.target.value}`)
      .then((res) => {
        setSearchedItems(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    if (searchedItems.length > 0) {
      let params = new URLSearchParams();
      params.append("searchedItems", searchedItems);
      navigate("/searchPage", { state: { searchedItems } });
    }
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
const NavBar = ({ userInfos, userDetails }) => {
  const [isAuthentificated, setIsAuthentificated] = useState(false);
  useEffect(() => {
    // console.log("userInfos", userInfos);
    // console.log("userDetails", userDetails);
    if (userInfos !== null || userDetails !== null) {
      setIsAuthentificated(true);
    } else {
      setIsAuthentificated(false);
    }
  }, [userInfos, userDetails]);
  console.log("isAuthentificated", isAuthentificated);
  return (
    <>
      {!isAuthentificated ? (
        <AtlassianNavigation
          label="site"
          renderSearch={SearchBar}
          renderSignIn={() => CallToAction(true)}
          renderProductHome={() => (
            <ProductHome href="#" icon={Logo} logo={Logo} />
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
            </PrimaryButton>,
          ]}
        />
      ) : (
        <>
          <AtlassianNavigation
            label="site"
            renderSearch={SearchBar}
            renderSignIn={() => CallToAction(false)}
            renderProductHome={() => (
              <ProductHome href="#" icon={Logo} logo={Logo} />
            )}
            // renderProfile={() => <Option userInfos={userInfos} />}
            primaryItems={[
              <PrimaryButton>
                <NavLink to="/">Home</NavLink>
              </PrimaryButton>,
              <PrimaryButton>
                <NavLink to="/">About</NavLink>
              </PrimaryButton>,
              <PrimaryButton>
                <NavLink to="/">Contact</NavLink>
              </PrimaryButton>,
            ]}
          />
        </>
      )}
    </>
  );
};

export default NavBar;
