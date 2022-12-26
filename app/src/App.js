import Login from "../../app/src/pages/Login"
import { Routes, Route } from "react-router-dom"
import Register from "../../app/src/pages/Register"
import SearchPage from "../../app/src/pages/SearchPage"
import Navbar from "../../app/src/components/Navbar"
import "./App.css"
import HomePage from "./pages/HomePage"
function App() {
  return (<>
  <Navbar/>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
        <Route path="/Login" element={ <Login/> } />
        <Route path="/Register" element={ <Register/> } />
        <Route path="/SearchPage" element={ <SearchPage/> } />
      </Routes>
 
 </>);
}

export default App;
