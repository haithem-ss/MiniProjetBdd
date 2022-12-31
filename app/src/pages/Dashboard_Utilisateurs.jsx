import Sidebar from "../components/Dashboard/Sidebar"
import {  SectionTitle, StatsCard } from "../components/Dashboard/Components";
import React from "react";
import {motion} from "framer-motion"
import {UtilityBar,DownloadSVG} from "../components/Dashboard/Components"
import Navbar from "../components/Dashboard/Navbar"
import axios from "axios"
function Table({ rows, head, checkbox, status }) {
    

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
                <p>A propos de la commande</p>
                <p>Supprimer la commande</p>
                <p>Marqué comme fait</p>
            </motion.div>


        </>
    }

    return <table>
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
        {rows.map((item) => (
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
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.phoneNumber}</td>
                <td>{item.email}</td>
                <td>{item.dateOfBirth}</td>

                <td><Option /></td>
            </tr>

        ))}


    </table>
}


export default function () {

    const [users, setUsers] = React.useState([])
    React.useEffect(()=>{
            axios.get("http://localhost:5000/users/all")
        .then((response)=>{

            setUsers(response.data)
            console.log(response.data)
            return
        })

    },[])
    return (<div className="dashboard">
        <Sidebar />
        <Navbar />

        <div className="ContentWrapper">
            <div className="UpperSectionWrapper">
            </div>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    justifyContent: "space-between",
                    marginBottom: "1rem"
                }}>
                {SectionTitle("Liste des utilisateur","Télécharger", <DownloadSVG></DownloadSVG>)}
                <div className="MainStatsWrapper">

                    {StatsCard("Nombre des utilisateurs", users.length)}
                </div>

            </div>
            <UtilityBar  button={false}/>
            <Table
                checkbox={false}
                status={false}
                head={[
                    "Nom", "Prénom", "N° de téléphone", "Email", "Date de naissance"
                ]}
                rows={users}
            />
            {/* {SectionTitle("Liste des produits","Télécharger",<DownloadSVG/>)} */}

            {/*
            <div className="TitleStatsWrapper">
                {StatsCard("Produits vendu dans ce mois",150)}
                {StatsCard("Nouveau utilisateur",150)}
                {StatsCard("Profit de ce mois",150)}
            </div> */}






            {/* {SectionTitle("Liste des produits","Télécharger",<DownloadSVG/>)} */}
            {/* <table>
                <tr>
                    <th>
                        <input type="checkbox" id="scales" name="selectAll"
                            onClick={handleClickInput}
                        ></input>

                    </th>
                    <th>Nom de produit</th>
                    <th>Marque</th>
                    <th>Prix</th>
                </tr>
                {products.map((item) => (
                    <tr>
                        <td>
                            <input type="checkbox" className="TableCheckBox" data-ordre={products.indexOf(item)} id={item.title}
                                onClick={handleClickInput}
                            ></input>

                        </td>
                        <td>{item.title}</td>
                        <td>{item.brand}</td>
                        <td>{item.price}</td>
                        <td><Option /></td>
                    </tr>

                ))}


            </table> */}
            {/* <div className="statusFait">Fait</div>
            <div className="statusAttente">En attente</div> */}

            {/* <BackArrow/> */}
        </div>
    </div>)
}