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
import axios from "axios";
import { motion } from "framer-motion";
import Button from "@atlaskit/button";
import ProfilePic from "../assets/Profile";
import Avatar from "@atlaskit/avatar";
import Heart from "../assets/Heart";
import Cart from "../assets/Cart";
import ShoppingCartDropDown from "../assets/ShoppingCartDropDown";
const logout = () => {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};
const Option = ({ userInfos }) => {
  const [open, isOpen] = React.useState(false);
  const ToggleDropDown = () => {
    isOpen(!open);
  };
  let Navigate = useNavigate();

  return (
    <>
      <button className="dropdown" onClick={ToggleDropDown}>
        <Avatar size="small" src={"../assets/Profile.jpg"} />
      </button>
      <motion.div
        className="dropdown-content"
        id="userInfos"
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
        <div
          style={{
            paddingTop: " 0.5rem",
          }}
        >
          Bienvenue
          <span
            style={{
              fontWeight: 600,
              marginInline: 5,
            }}
          >
            {userInfos.firstName} {userInfos.lastName}
          </span>
        </div>
        <br></br>
        <div
          id="logout"
          onClick={() => {
            logout();
            Navigate("/Dashboard");
          }}
        >
          Panneau de configuration
        </div>
        <div
          id="logout"
          onClick={() => {
            logout();
            Navigate("/");
            document.location.reload();
          }}
        >
          Se déconnecter
        </div>
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
  // const onChange = (event) => {
  //   console.log("search clicked with value: ", event.target.value);
  //   setValue(event.target.value);
  //   axios.get(`http://localhost:5000/search?value=${event.target.value}`)
  //     .then((res) => {
  //       setSearchedItems(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //   if (searchedItems.length > 0) {
  //     let params = new URLSearchParams();
  //     params.append("searchedItems", searchedItems);
  //     navigate("/searchPage", { state: { searchedItems } });
  //   }
  // };
  const onChange = (event) => {
    console.log("search clicked with value: ", event.target.value);
    console.log(event.key)
    setValue(event.target.value);
    // axios.get(`http://localhost:5000/search?value=${event.target.value}`)
    //   .then((res) => {
    //     console.log(res.data)
    //     setSearchedItems(res.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    // if (searchedItems.length > 0) {
      // let params = new URLSearchParams();
      // params.append("searchedItems", searchedItems);
      // navigate("/searchPage", { state: { searchedItems } });

    // }
  };

  return (
    <input
      onChange={onChange}
      onKeyDown={(e)=>{
        if (e.key==="Enter"){
          navigate("/searchPage/"+e.target.value);
          window.location.reload()
        }
      }}
      placeholder="Rechercher un produit"
      tooltip="Search"
      label="Search"
      value={value}
    />
  //   <Search
  //   onClick={onChange}
  //   placeholder="Rechercher un produit"
  //   tooltip="Search"
  //   label="Search"
  //   value={value}
  // />
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
