import LoginForm from "../components/Login/Form"
import AuthSvg from "../assets/AuthSvg"

export default function Login (){


  return (<>
    <div
      style={{
        height: 'calc(100vh - 56px)',
        display: "flex",
        justifyContent: "space-between",
        overflow: "hidden",
      }}>
      <LoginForm />
      <div
        className="authSection"
      >
        <span className="authSlogan">
          La meilleure boutique pour tous vos besoins.
        </span>
        <AuthSvg />

      </div>
    </div>
  </>)
}