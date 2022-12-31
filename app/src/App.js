import SearchPage from "../../app/src/pages/SearchPage";
import "./App.css";
import HomePage from "./pages/HomePage";
import React from "react";
import Login from "./pages/Login";
import { Routes, Route,useLocation   } from "react-router-dom";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import Product from "./components/productPage/product";
import History from "./components/History";
import CartItems from "./components/CartItems";
import AdminProduct from "./components/Admin/ProductPage";
import Success from "./components/Success";
import axios from "axios";
import { Navigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import "./styles/dashboard.css";
import Dashboard_Produits from "./pages/Dashboard_Produits"
import Dashboard_Utilisateurs from "./pages/Dashboard_Utilisateurs"
import "./App.css";
function App() {
  const [user, setUser] = React.useState(null);
  const [userInfos, setUserInfos] = React.useState(null);
  const axiosJWT = axios.create();
  const [accessToken, setAccessToken] =React.useState(localStorage.getItem("accessToken"));
  React.useEffect(() => {
    try {
      setUserInfos(jwt_decode(accessToken));
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    } catch {
      console.log("Logged out");
    }
  }, [accessToken]);

  const refreshToken = async () => {
    try {
      const res = await axios.post("http://localhost:5000/users/refreshToken", {
        refreshToken: JSON.parse(localStorage.getItem("refreshToken")),
      });

      return res.data;
    } catch (err) {
      console.log(err);
    }
  };
  axiosJWT.interceptors.request.use(
    async (config) => {
      let currentDate = new Date();
      const decodedToken = jwt_decode(user.accessToken);
      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        console.log("Refreshing token");
        const data = await refreshToken();
        config.headers["authorization"] = "Bearer " + data.accessToken;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const url = `${process.env.REACT_APP_API_URL}/users/auth/success`;
  const getUSer = () => {
    axios
      .get(url, { withCredentials: true })
      .then((res) => {
        setUser(res.data.user.properties);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  React.useEffect(() => {
    // console.log(url);
    getUSer();
  }, []);
  const location = useLocation()
  console.log(location.pathname)
  return (
    <>
    {!location.pathname.includes("Dashboard") ? <Navbar userInfos={userInfos} /> : null }
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/SearchPage" element={<SearchPage />} />
        <Route path="/product" element={<Product />} />
        <Route path="/CartItems" element={<CartItems />} />
        <Route path="/History" element={<History />} />
        <Route path="/Dashboard/Produits/Ajouter" element={<AdminProduct />} />
        <Route path="/Dashboard/Produits" element={<Dashboard_Produits />} />
        <Route path="/Dashboard/Utilisateurs" element={<Dashboard_Utilisateurs />} />
        <Route path="/Success" element={<Success userDetails={user} />} />
      </Routes>
    </>
  );
}

export default App;
