import Login from "./pages/Login"
import { Routes, Route } from "react-router-dom"
import Register from "./pages/Register"
import Navbar from "./components/Navbar"
import ContainerExample from"./components/home/top"
import Product from "./components/productPage/product"
import "./App.css"
function App() {
  return (<>
  <Navbar/>
        <Routes>
          <Route path="/" element={<ContainerExample/>}/>
        <Route path="/Login" element={ <Login/> } />
        <Route path="/Register" element={ <Register/> } />
        <Route path="/product" element={ <Product/> } />
      </Routes>
 
 </>);
}

export default App;
