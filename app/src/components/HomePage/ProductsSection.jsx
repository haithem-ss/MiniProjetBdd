import React from "react";
import { motion } from "framer-motion"
import ProductCard from "../../assets/ProductCard";
import axios from "axios"
import Button from '@atlaskit/button';
import { Toaster } from 'react-hot-toast';
import Spinner from "@atlaskit/spinner"

import { useNavigate } from "react-router-dom";

const Arrow=()=>(
<svg width="9" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.6335 19.7075C10.2285 20.0975 9.57351 20.0975 9.16951 19.7075L0.606667 11.4439C0.41499 11.2618 0.262365 11.0425 0.158073 10.7996C0.0537815 10.5566 0 10.2949 0 10.0305C0 9.76609 0.0537815 9.50443 0.158073 9.26145C0.262365 9.01846 0.41499 8.79923 0.606667 8.61707L9.23151 0.292494C9.42726 0.106451 9.68647 0.00188239 9.95652 2.51676e-05C10.2266 -0.00183205 10.4872 0.0991613 10.6855 0.282495C10.7837 0.37303 10.8623 0.482766 10.9164 0.604907C10.9705 0.727049 10.9989 0.858994 11 0.992574C11.001 1.12615 10.9746 1.25852 10.9224 1.38148C10.8702 1.50445 10.7933 1.61538 10.6965 1.70742L2.80263 9.32404C2.70671 9.41512 2.63033 9.52477 2.57814 9.64631C2.52595 9.76785 2.49903 9.89873 2.49903 10.031C2.49903 10.1633 2.52595 10.2942 2.57814 10.4157C2.63033 10.5372 2.70671 10.6469 2.80263 10.738L10.6335 18.2946C10.7294 18.3856 10.8057 18.4951 10.8579 18.6166C10.9101 18.7381 10.937 18.8689 10.937 19.0011C10.937 19.1332 10.9101 19.264 10.8579 19.3855C10.8057 19.507 10.7294 19.6165 10.6335 19.7075Z" fill="#495057"/>
</svg>

)
function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
}
export default function ProductsSection() {
    const [windowDimensions, setWindowDimensions] = React.useState(getWindowDimensions());
    const [NextElement, setNextElement] = React.useState(undefined)
    const [user, setUser] = React.useState(localStorage.getItem("userInfo") ? localStorage.getItem("userInfo") : null)
    const [popular, setPopular] = React.useState([])
    const [recommanded, setRecommanded] = React.useState([])
    React.useEffect(() => {
        console.log(user)
        if (user) {
            axios.post("http://localhost:5000/Products/Recommanded", { email: user.email })
                .then((response => {
                    if (response.data.recommanded.length < 7) {
                        let rec = []
                        rec = response.data.recommanded
                        const taille = rec.length
                        console.log(taille)
                        rec = rec.concat(response.data.popular.slice(0, 7 - taille))
                        let recommanded = []
                        for (let i of rec) {
                            console.log(i._fields[0].properties)
                            recommanded.push(i._fields[0].properties)
                        }
                        let pop = []
                        for (let i of response.data.popular.slice(7 - taille)) {
                            console.log(i._fields[0].properties)
                            pop.push(i._fields[0].properties)
                        }
                        setRecommanded(recommanded)
                        setPopular(pop)

                    }


                }))
        } else {
            axios.post("http://localhost:5000/Products/Recommanded", { email: "" })
                .then((response => {
                    if (response.data.recommanded.length < 7) {
                        let rec = []
                        rec = response.data.recommanded
                        const taille = rec.length
                        console.log(taille)
                        rec = rec.concat(response.data.popular.slice(0, 7 - taille))
                        let recommanded = []
                        for (let i of rec) {
                            console.log(i._fields[0].properties)
                            recommanded.push(i._fields[0].properties)
                        }
                        let pop = []
                        for (let i of response.data.popular.slice(7 - taille)) {
                            console.log(i._fields[0].properties)
                            pop.push(i._fields[0].properties)
                        }
                        setRecommanded(recommanded)
                        setPopular(pop)
                        console.log(recommanded)
                        console.log(pop)

                    }


                }))
        }

    }, [user])
    const NbrCardsPerPage = () => {
        console.log(windowDimensions)
        switch (true) {
            case windowDimensions.width <= 1280:
                return 3
            case windowDimensions.width <= 1600:
                return 3
        }
        return 4

    }
    let x = NbrCardsPerPage()
    console.log(document.getElementsByClassName("SearchResultContainer")[0])
    React.useEffect(() => {
        if (recommanded.length - x > 0) {
            setNextElement(x)
        } else {
            setNextElement(null)
        }

    }, [recommanded])

    const [animation, setAnimation] = React.useState(null)
    const offset = -360
    let scrollAnimationForward = {
        before: {
            x: 0
        }, forward: {
            x: `${offset * (NextElement - x)}px`,
            transition: {
                duration: 0.5
            }
        }, backward: {
            x: `${1 * offset * (NextElement - x)}px`,
            transition: {
                duration: 0.5
            }
        }
    }

    const onClickRigth = () => {

        if (recommanded.length > NextElement && NextElement !== null) {
            setNextElement(NextElement + 1)
        }
        setAnimation(1)


    }
    const onClickLeft = () => {
        setAnimation(0)

        if (x < NextElement) {
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
            <h2>Produits pour vous</h2>
            <div
                style={{
                    display: "flex",
                    gap: "1rem"
                }}>
                <div onClick={onClickLeft} className="Arrow " >
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
        <>
                  <div>
        <Toaster />
      </div>
      {recommanded.length===0 && popular.length===0 ? <>
        <div
                style={{
                    width: "100%",
                    height:"calc(100vh - 120px)",
                    display:"flex",
                    justifyContent:"center",
                    alignItems:"center"
                }}
            >
                <div>
                <Spinner
                    size={"large"}
                />
                </div>
                </div>
      </>:<>
      <section className="section">
                <TopBar />
                <motion.div
                    variants={scrollAnimationForward}
                    initial={animation === 1 && NextElement !== null ? "before" : "before"}
                    animate={animation === 1 && NextElement !== null ? "forward" : (animation === 0 && NextElement !== null ? "backward" : "")}
                    className="CardsWrapper">

                    {recommanded.map((item) => (
                        <ProductCard title={item.ProductName} brand={item.ProductBrand} description={item.ProductDescription} price={item.ProductPrice}></ProductCard>
                    ))}
                </motion.div>

            </section>
            <section >
                <h2 style={{
                    marginBottom: "4rem"
                }}>Meuilleurs ventes</h2>


                {/* {loading === false && popular.length != 0 ? <> */}
                {popular.length != 0 ? <>
                    <div
                        className="SearchResultContainer"
                    >
                        {popular.map((item) => (
                            <ProductCard title={item.ProductName} brand={item.ProductBrand} description={item.ProductDescription} price={item.ProductPrice}></ProductCard>
                        ))}
                    </div>
                </> : null
                }
                <div id="more"
                    style={{
                        width: "fit-content",
                        margin: "2rem auto"
                    }}>
                    <Button appearance="primary">Voir tous les produits</Button>
                </div>
            </section>
      </>}

        </>
    )

}