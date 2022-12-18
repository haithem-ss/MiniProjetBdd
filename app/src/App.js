import React from "react";
import Login from "./pages/Login";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import CartItems from "./components/CartItems";
import History from "./components/History";
import "./App.css";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<>Home page</>} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/CartItems" element={<CartItems />} />
        <Route path="/History" element={<History />} />
      </Routes>
    </>
  );
}

export default App;
