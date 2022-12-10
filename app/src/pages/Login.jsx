import LoginForm from "../components/Login/Form"

export default function Login (){


  return (<>
  <div
  style={{
    height:'calc(100vh - 56px)',
    display:"flex",
    justifyContent:"space-between"
  }}>
  <LoginForm/>
  <div
  style={{
    width:"50%"
  }}
  >
    SVG Section
  </div>
  </div>
  </>)
}