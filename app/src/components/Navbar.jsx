import React from 'react';
import { NavLink } from "react-router-dom";
import Logo from '../assets/Logo';
import {
  AtlassianNavigation,
  PrimaryButton,
  ProductHome,
  Search,
  Profile
} from '@atlaskit/atlassian-navigation';
import Button from '@atlaskit/button';
import ProfilePic from "../assets/Profile"
import Avatar from '@atlaskit/avatar';
import Heart from "../assets/Heart"
import Cart from "../assets/Cart"

const CallToAction = (isAuth) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        gap: "1rem",
        alignItems: "center"
      }}
    >
      {isAuth ? <>
        <Button
          id="navBarCTA"
          appearance='primary'>
          Se connecter
        </Button>
        <PrimaryButton>
          S'identifier
        </PrimaryButton>
      </> : <>
        <PrimaryButton
          iconBefore={<>
          <Cart />
          </>}
        >
          Panier
        </PrimaryButton>
        <PrimaryButton
          iconBefore={<Heart />}
        >
          Favouris
        </PrimaryButton>
      </>}


    </div>
  )


};

const SearchBar = () => {
  const [value, setValue] = React.useState('');
  const onChange = (event) => {
    console.log('search clicked with value: ', event.target.value);
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
    renderProfile={() => <Profile
      onClick={() => console.log("Clicked")}
      icon={<Avatar size="small" src={"../assets/Profile.jpg"} />}
      tooltip="Your profile and settings"
    />}
    renderProductHome={() => (
      <ProductHome href="#" siteTitle="Eden shop" icon={Logo} logo={Logo} />
    )}
    primaryItems={[
      <PrimaryButton>
        <NavLink to="/" >
          Home
        </NavLink>
      </PrimaryButton>,
      <PrimaryButton>
        <NavLink to="/" >
          About
        </NavLink>
      </PrimaryButton>,
      <PrimaryButton>
        <NavLink to="/" >
          Contact
        </NavLink>
      </PrimaryButton>,
    ]}
  />
);

export default NavBar;