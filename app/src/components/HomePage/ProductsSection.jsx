import React from "react";
import { motion } from "framer-motion"
import ProductCard from "../../assets/ProductCard";
import Arrow from "../../assets/Arrow"
export default function ProductsSection() {
    const [NextElement, setNextElement] = React.useState(undefined)
    const [products, setProducts] = React.useState([
        {title:"item1", brand:"brand1",description:"description1",price:"price 1"},
        {title:"item2", brand:"brand2",description:"description2",price:"price 2"},
        {title:"item3", brand:"brand3",description:"description3",price:"price 3"},
        {title:"item4", brand:"brand4",description:"description4",price:"price 4"},
        {title:"item5", brand:"brand5",description:"description5",price:"price 5"},
        {title:"item6", brand:"brand6",description:"description6",price:"price 6"},
    ])
    React.useEffect(() => {
        if (products.length - 4 > 0) {
            setNextElement(4)
        } else {
            setNextElement(null)
        }
    }, [products])
    const [animation, setAnimation] = React.useState(null)
    const offset = -24.666666666666668
    let scrollAnimationForward = {
        before: {
            x: 0
        }, forward: {
            x: `${offset * (NextElement - 4)}vw`,
            transition: {
                duration: 0.5
            }
        }, backward: {
            x: `${1 * offset * (NextElement - 4)}vw`,
            transition: {
                duration: 0.5
            }
        }
    }

    const onClickRigth = () => {

        if (products.length > NextElement && NextElement !== null) {
            setNextElement(NextElement + 1)
        }
        setAnimation(1)


    }
    const onClickLeft = () => {
        setAnimation(0)

        if (4 < NextElement) {
            setNextElement(NextElement - 1)
        }
    }


    const TopBar = () => (
        <div
            style={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "row",
                alignItems: "center"
            }}
        >
            <h2>Todays best deals for you</h2>
            <div
                style={{
                    display: "flex",
                    gap: "1rem"
                }}>
                <div onClick={onClickLeft} className="Arrow" >
                    <Arrow />
                </div>
                <div onClick={onClickRigth} className="Arrow inverted" >
                    <Arrow />
                </div>
                {/* <button onClick={onClickRigth}>=</button> */}
            </div>
        </div>
    )


    return (
        <section className="section">
            <TopBar />
            <motion.div
                variants={scrollAnimationForward}
                initial={animation === 1 && NextElement !== null ? "before" : "before"}
                animate={animation === 1 && NextElement !== null ? "forward" : (animation === 0 && NextElement !== null ? "backward" : "")}
                className="CardsWrapper">

                {products.map((item) => (
                    <ProductCard title={item.title} brand={item.brand} description={item.description} price={item.price}></ProductCard>
                ))}
            </motion.div>

        </section>)

}