import Sidebar from "../components/Dashboard/Sidebar"
import { SectionTitle, StatsCard } from "../components/Dashboard/Components";
import React from "react";
import { UtilityBar, DownloadSVG } from "../components/Dashboard/Components"
import Navbar from "../components/Dashboard/Navbar"
import { Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion"
import Spinner from "@atlaskit/spinner"
import TextField from '@atlaskit/textfield';

function Table({ rows, head, checkbox, status, button, text, link }) {
    const [filteredData, setFilteredData] = React.useState(rows)
    const [searchText, setSearchText] = React.useState("")
    React.useEffect(() => {
        if (searchText != "") {
            let data = []
            for (let i of rows) {
                try {
                    if (i.client.toLowerCase().includes(searchText) ) {
                        data.push(i)
                    }
                } catch (e) {
                    console.log(e)
                }

            }
            setFilteredData(data)
        }
        if (searchText === "") {
            setFilteredData(rows)
        }
    }, [searchText])
    let data = searchText === "" ? rows : filteredData
    const handleClickInput = (e) => {
        if (e.target.name === "selectAll") {
            if (e.target.checked === true) {
                console.log("Select All")
                for (let i of document.querySelectorAll(".TableCheckBox")) {
                    console.log(i.target)
                }
                setIsChecked(Array(rows.length).fill(true))
            } else {
                setIsChecked(Array(rows.length).fill(false))
            }
        } else {
            console.log(e.target.checked)
            let is = isChecked
            isChecked[e.target.dataset.ordre] = !isChecked[e.target.dataset.ordre]
            setIsChecked(is)
        }

    }
    const [isChecked, setIsChecked] = React.useState(Array(rows.length).fill(false))
    const Option = () => {
        const [open, isOpen] = React.useState(false)
        const ToggleDropDown = () => {
            console.log(!open)
            isOpen(!open)
        }
        return <>
            <button className="dropdown" onClick={ToggleDropDown}>
                <svg width="21" height="5" viewBox="0 0 21 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="2.5" cy="2.5" r="2.5" fill="#ADB5BD" />
                    <circle cx="10.5" cy="2.5" r="2.5" fill="#ADB5BD" />
                    <circle cx="18.5" cy="2.5" r="2.5" fill="#ADB5BD" />
                </svg>
            </button>
            <motion.div className="dropdown-content"
                initial={{
                    opacity: 0,
                    display: "none",
                    x: "-200px",
                }}

                animate={open ? {
                    display: "block",
                    opacity: 1,
                    transition: {
                        duration: 0.25
                    }
                } : {}
                }
            >
                <p>A propos de client</p>
            </motion.div>


        </>
    }

    return <div>
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: "2rem",
                marginBottom: "1rem"
            }}
        >
            <div className="flex start">


                <div className="filter">
                    Catégorie
                    <span>
                        Toutes
                        <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.00019 6.5C5.86858 6.50076 5.73812 6.47554 5.61628 6.42577C5.49444 6.37601 5.38363 6.30268 5.29019 6.21L1.29019 2.21C1.19695 2.11676 1.12299 2.00607 1.07253 1.88425C1.02207 1.76243 0.996094 1.63186 0.996094 1.5C0.996094 1.36814 1.02207 1.23757 1.07253 1.11575C1.12299 0.99393 1.19695 0.88324 1.29019 0.790002C1.38342 0.696763 1.49411 0.622802 1.61594 0.572342C1.73776 0.521882 1.86833 0.495911 2.00019 0.495911C2.13204 0.495911 2.26261 0.521882 2.38444 0.572342C2.50626 0.622802 2.61695 0.696763 2.71019 0.790002L6.00019 4.1L9.30019 0.920002C9.39218 0.817712 9.50428 0.735503 9.6295 0.678517C9.75471 0.621531 9.89033 0.590994 10.0279 0.588815C10.1654 0.586635 10.302 0.612861 10.4289 0.665852C10.5559 0.718843 10.6705 0.797459 10.7657 0.896784C10.8609 0.996108 10.9346 1.114 10.9821 1.2431C11.0297 1.37219 11.0501 1.50971 11.042 1.64704C11.034 1.78438 10.9977 1.91858 10.9355 2.04126C10.8732 2.16393 10.7863 2.27244 10.6802 2.36L6.68019 6.22C6.49731 6.39632 6.25419 6.49643 6.00019 6.5Z" fill="#2F45C5" />
                        </svg>

                    </span>
                </div>
                <div className="filter">
                    Trier par
                    <span >
                        Prix
                        <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.00019 6.5C5.86858 6.50076 5.73812 6.47554 5.61628 6.42577C5.49444 6.37601 5.38363 6.30268 5.29019 6.21L1.29019 2.21C1.19695 2.11676 1.12299 2.00607 1.07253 1.88425C1.02207 1.76243 0.996094 1.63186 0.996094 1.5C0.996094 1.36814 1.02207 1.23757 1.07253 1.11575C1.12299 0.99393 1.19695 0.88324 1.29019 0.790002C1.38342 0.696763 1.49411 0.622802 1.61594 0.572342C1.73776 0.521882 1.86833 0.495911 2.00019 0.495911C2.13204 0.495911 2.26261 0.521882 2.38444 0.572342C2.50626 0.622802 2.61695 0.696763 2.71019 0.790002L6.00019 4.1L9.30019 0.920002C9.39218 0.817712 9.50428 0.735503 9.6295 0.678517C9.75471 0.621531 9.89033 0.590994 10.0279 0.588815C10.1654 0.586635 10.302 0.612861 10.4289 0.665852C10.5559 0.718843 10.6705 0.797459 10.7657 0.896784C10.8609 0.996108 10.9346 1.114 10.9821 1.2431C11.0297 1.37219 11.0501 1.50971 11.042 1.64704C11.034 1.78438 10.9977 1.91858 10.9355 2.04126C10.8732 2.16393 10.7863 2.27244 10.6802 2.36L6.68019 6.22C6.49731 6.39632 6.25419 6.49643 6.00019 6.5Z" fill="#2F45C5" />
                        </svg>

                    </span>

                </div>
            </div>
            <div className="flex end">
                <div
                    style={{
                        borderRadius: "30px",
                        height: "100%"
                    }}>
                    <TextField
                        isCompact
                        placeholder="Rechercher"
                        onChange={(e) => {
                            setSearchText(e.target.value)
                            { return e.target.value }
                        }}
                        elemBeforeInput={
                            <div style={{ height: 30, width: 30, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <svg width="20" height="20" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M28.7908 26.5425L23.4075 21.175C25.1444 18.9622 26.0868 16.2297 26.0833 13.4167C26.0833 10.9114 25.3405 8.46247 23.9486 6.37945C22.5568 4.29643 20.5785 2.67291 18.264 1.7142C15.9495 0.755488 13.4026 0.504646 10.9455 0.993392C8.48844 1.48214 6.23145 2.68852 4.45999 4.45999C2.68852 6.23145 1.48214 8.48844 0.993392 10.9455C0.504646 13.4026 0.755488 15.9495 1.7142 18.264C2.67291 20.5785 4.29643 22.5568 6.37945 23.9486C8.46247 25.3405 10.9114 26.0833 13.4167 26.0833C16.2297 26.0868 18.9622 25.1444 21.175 23.4075L26.5425 28.7908C26.6897 28.9392 26.8648 29.057 27.0578 29.1374C27.2507 29.2178 27.4577 29.2592 27.6667 29.2592C27.8757 29.2592 28.0826 29.2178 28.2756 29.1374C28.4685 29.057 28.6436 28.9392 28.7908 28.7908C28.9392 28.6436 29.057 28.4685 29.1374 28.2756C29.2178 28.0826 29.2592 27.8757 29.2592 27.6667C29.2592 27.4577 29.2178 27.2507 29.1374 27.0578C29.057 26.8648 28.9392 26.6897 28.7908 26.5425ZM3.91667 13.4167C3.91667 11.5377 4.47384 9.70102 5.51771 8.13876C6.56158 6.57649 8.04528 5.35885 9.78118 4.63982C11.5171 3.92078 13.4272 3.73265 15.27 4.09921C17.1129 4.46577 18.8056 5.37056 20.1342 6.69916C21.4628 8.02776 22.3676 9.7205 22.7341 11.5633C23.1007 13.4061 22.9126 15.3163 22.1935 17.0522C21.4745 18.7881 20.2569 20.2718 18.6946 21.3156C17.1323 22.3595 15.2956 22.9167 13.4167 22.9167C10.8971 22.9167 8.48075 21.9158 6.69916 20.1342C4.91756 18.3526 3.91667 15.9362 3.91667 13.4167Z" fill="#2F45C5" />
                                </svg>
                            </div>
                        }
                        aria-label="Filter" />
                </div>

            </div>
        </div>
        {data.length===0 && <h3 style={{textAlign:"center",margin:"3rem auto",fontWeight:"500"}}>Aucune résultat</h3>}

       {data.length!=0 && <table>
            <tr>
                <th>
                    {checkbox ? <>
                        <input type="checkbox" id="scales" name="selectAll"
                            onClick={handleClickInput}
                        ></input>
                    </> : null}


                </th>
                {head.map((item) => (
                    <th>{item}</th>
                ))}
            </tr>
            {data.length!=0 && data.map((item) => (
                <tr>
                    <td>
                        {checkbox ? <>
                            <input type="checkbox" className="TableCheckBox" data-ordre={rows.indexOf(item)} id={item.title}
                                onClick={handleClickInput}
                            ></input>
                        </> : null}
                        {status ? <>
                            {
                                item.status === "Fait" ?
                                    <div className="statusFait">Fait</div> :
                                    <div className="statusAttente">En attente</div>
                            }
                        </> : null}



                    </td>
                    <td>///</td>
                    <td>{item.client}</td>
                    <td>{item.NbrProduits.low}</td>
                    <td>{item.order.amount}</td>
                    <td><Option /></td>
                </tr>

            ))}


        </table>}
    </div>

}
export default function () {

    const [commandes, setProducts] = React.useState([])
    React.useEffect(() => {
        axios.get("http://localhost:5000/checkouts")
            .then((response) => {
                const data = []
                for (let i of response.data.commandes) {
                    data.push({ order: i._fields[0].properties, client: i._fields[1] ,NbrProduits: i._fields[2]})
                }
                console.log(data)
                setProducts(data)
            })
    }, [])


    return (<div className="dashboard">
        <Sidebar />
        <Navbar />

        <div className="ContentWrapper">

            {commandes.length === 0 ? <div
                style={{
                    width: "75vw",
                    height: "calc(100vh - 120px)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <div>
                    <Spinner
                        size={"large"}
                    />
                </div>

            </div> :
                <>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            width: "100%",
                            justifyContent: "space-between",
                            marginBottom: "1rem"
                        }}>
                        {SectionTitle("Liste des commandes", "Télécharger", <DownloadSVG></DownloadSVG>)}
                        <div className="MainStatsWrapper">

                            {StatsCard("Nombre de commandes", commandes.length)}
                        </div>

                    </div>
                    <Table
                        checkbox={false}
                        status={false}
                        head={[
                            "Date de commande", "Client", "Nombre de produits", "Total"
                        ]}
                        rows={commandes}
                        text="Nouvelle produit"
                        button={true}
                        link="/Dashboard/Produits/Ajouter"

                    />
                </>}


        </div>
    </div>)
}