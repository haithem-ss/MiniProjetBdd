import Sidebar from "../components/Dashboard/Sidebar";
import {
  Table,
  SectionTitle,
  StatsCard,
} from "../components/Dashboard/Components";
import React from "react";
import { UtilityBar, DownloadSVG } from "../components/Dashboard/Components";
import Navbar from "../components/Dashboard/Navbar";
import { Link } from "react-router-dom";
import axios from "axios";
import Spinner from "@atlaskit/spinner";
import { useRef } from "react";

export default function () {
  const [products, setProducts] = React.useState([]);
  const [productName, setProductName] = React.useState("");
  React.useEffect(() => {
    axios.get("http://localhost:5000/products").then((response) => {
      const data = [];
      for (let i of response.data.response) {
        data.push(i._fields[0].properties);
      }
      setProducts(data);
    });
  }, []);

  return (
    <div className="dashboard">
      <Sidebar />
      <Navbar />

      <div className="ContentWrapper">
        {products.length === 0 ? (
          <div
            style={{
              width: "75vw",
              height: "calc(100vh - 120px)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div>
              <Spinner size={"large"} />
            </div>
          </div>
        ) : (
          <>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                justifyContent: "space-between",
                marginBottom: "1rem",
              }}
            >
              {SectionTitle(
                "Liste des produits",
                "Télécharger",
                <DownloadSVG></DownloadSVG>
              )}
              <div className="MainStatsWrapper">
                {StatsCard("Nombre de produits", products.length)}
                {StatsCard("Nombre de catégories", 20)}
              </div>
            </div>
            <Table
              checkbox={false}
              status={false}
              head={["Titre", "Marque", "Description", "Stock", "Prix"]}
              rows={products}
              text="Nouvelle produit"
              button={true}
              link="/Dashboard/Produits/Ajouter"
            />
          </>
        )}

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
    </div>
  );
}
