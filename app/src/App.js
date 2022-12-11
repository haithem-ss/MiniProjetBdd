import Login from "./pages/Login"
import { Routes, Route } from "react-router-dom"
import Register from "./pages/Register"
import Navbar from "./components/Navbar"
import "./App.css"
function App() {
  return (<>
  <Navbar/>
        <Routes>
          <Route path="/" element={<>Home page</>}/>
        <Route path="/Login" element={ <Login/> } />
        <Route path="/Register" element={ <Register/> } />
      </Routes>
 
 </>);
}

export default App;
