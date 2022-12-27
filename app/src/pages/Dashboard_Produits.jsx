import Sidebar from "../components/Dashboard/Sidebar"
import { Table, SectionTitle, StatsCard } from "../components/Dashboard/Components";
import React from "react";
import {UtilityBar,DownloadSVG} from "../components/Dashboard/Components"
import Navbar from "../components/Dashboard/Navbar"
import { Link } from "react-router-dom";
import axios from "axios";
export default function () {

    const [products, setProducts] = React.useState([
    ])
    React.useEffect(()=>{
            axios.get("http://localhost:5000/products")
        .then((response)=>{
            const data=[]
            for( let i of response.data.response){
                data.push(i._fields[0].properties)
            }

        setProducts(data)

        })

    },[products])


    return (<div className="dashboard">
        <Sidebar />
        <Navbar />

        <div className="ContentWrapper">
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    justifyContent: "space-between",
                    marginBottom: "1rem"
                }}>
                {SectionTitle("Liste des produits","Télécharger", <DownloadSVG></DownloadSVG>)}
                <div className="MainStatsWrapper">

                    {StatsCard("Nombre de produits", 150)}
                    {StatsCard("Nombre de catégories", 150)}
                </div>

            </div>
            <UtilityBar text="Nouvelle produit" button={true} link="/Dashboard/Produits/Ajouter"/>
            <Table
                checkbox={false}
                status={false}
                head={[
                    "Nom de produit", "Marque", "Description", "Stock", "Prix"
                ]}
                rows={products}
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