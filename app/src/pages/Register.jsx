import React from "react"
import RegisterForm from "../components/Register/Form"
export default function Register (){


    
  return (<>
    <div
    style={{
      height:'calc(100vh - 56px)',
      display:"flex",
      justifyContent:"space-between"
    }}>
    <RegisterForm/>

    </div>
    </>) 
}