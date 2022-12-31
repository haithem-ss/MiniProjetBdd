import CheckoutSVG from "../../assets/CheckoutSVG";
import Button from '@atlaskit/button';
import {motion} from "framer-motion"
export default function () {
    let fadeAnimation={
        initial:{
            y:"-5vh",
            opacity:0
        },fade:{
            y:0,
            opacity:1,
            transition:{
                duration:0.5
            }
        }
    }
    return (
    <motion.div className="CheckoutModal" 
    // variants={fadeAnimation} initial="initial" animate="fade"
    >
        <CheckoutSVG />
        <span className="CheckoutModalTitle">Payement effectué avec succes</span>
        <p className="CheckoutModalText">you finished the Payment with success, thank you for your trust and bye !</p>
        <Button shouldFitContainer appearance="primary">
            Allez vers la page d'acceuil
        </Button>
    </motion.div>
    )

}