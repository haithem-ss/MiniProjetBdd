import Login from "../../app/src/pages/Login"
import { Routes, Route } from "react-router-dom"
import Register from "../../app/src/pages/Register"
import SearchPage from "../../app/src/pages/SearchPage"
import Navbar from "../../app/src/components/Navbar"
import "./App.css"
import HomePage from "./pages/HomePage"
import React from "react";
import Login from "./pages/Login";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import ContainerExample from "./components/home/top";
import Product from "./components/productPage/product";
import History from "./components/History";
import CartItems from "./components/CartItems";
import AdminProduct from "./components/Admin/ProductPage";
import Success from "./components/Success";
import axios from "axios";
import { Navigate } from "react-router-dom";
import "./App.css";
function App() {
  const [user, setUser] = React.useState(null);
  const url = `${process.env.REACT_APP_API_URL}/users/auth/success`;
  const getUSer = () => {
    axios
      .get(url, { withCredentials: true })
      .then(res => {
        setUser(res.data.user.properties);
      })
      .catch(err => {
        console.log(err);
      });
  };
  React.useEffect(() => {
    // console.log(url);
    getUSer();
  }, []);
  return (<>
  <Navbar/>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
        <Route path="/Login" element={ <Login/> } />
        <Route path="/Register" element={ <Register/> } />
        <Route path="/SearchPage" element={ <SearchPage/> } />
        <Route path="/" element={<ContainerExample />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/product" element={<Product />} />
        <Route path="/CartItems" element={<CartItems />} />
        <Route path="/History" element={<History />} />
        <Route path="/AdminProduct" element={<AdminProduct />} />
        <Route path="/Success" element={<Success userDetails={user} />} />
        </Routes>

        </>
)

}

export default App;
