import Sidebar from "../components/Dashboard/Sidebar"
import { Table, SectionTitle, StatsCard } from "../components/Dashboard/Components";
import React from "react";
import {UtilityBar,DownloadSVG} from "../components/Dashboard/Components"
import Navbar from "../components/Dashboard/Navbar"

export default function () {

    const [products, setProducts] = React.useState([
        { title: "item1", brand: "brand1", description: "description1", price: "price 1" },
        { title: "item2", brand: "brand2", description: "description2", price: "price 2" },
        { title: "item3", brand: "brand3", description: "description3", price: "price 3" },
        { title: "item4", brand: "brand4", description: "description4", price: "price 4" },
        { title: "item5", brand: "brand5", description: "description5", price: "price 5" },
        { title: "item6", brand: "brand6", description: "description6", price: "price 6" },
        { title: "item7", brand: "brand7", description: "description7", price: "price 7" },
        { title: "item8", brand: "brand8", description: "description8", price: "price 8" },
        { title: "item9", brand: "brand9", description: "description9", price: "price 9" },
        { title: "item10", brand: "brand10", description: "description10", price: "price 10" },
        { title: "i11em6", brand: "bra11d6", description: "descriptio116", price: "price 11" },
        { title: "item12", brand: "brand12", description: "description12", price: "price 12" },
        { title: "i13em6", brand: "bra13d6", description: "descriptio136", price: "price 13" },
        { title: "it4m10", brand: "bran410", description: "description40", price: "price 14" },
        { title: "i15em6", brand: "bra15d6", description: "descriptio156", price: "price 15" },
        { title: "it6m10", brand: "bran610", description: "description60", price: "price 16" },
        { title: "i17em6", brand: "bra17d6", description: "descriptio176", price: "price 17" },
    ])


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
            <UtilityBar text="Nouvelle produit" button={true}/>
            <Table
                checkbox={false}
                status={true}
                head={[
                    "Status", "Nom & prénom", "N° de téléphone", "Date d'achat", "Prix", "Adresse"
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