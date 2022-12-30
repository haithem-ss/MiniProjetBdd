import axios from "axios";
import neo4j from "neo4j-driver";


function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
const catégoriesFr = [
  "smartphones",
  "ordinateurs portables",
  "parfums",
  "soin",
  "épicerie",
  "décoration de la maison",
  "meubles",
  "hauts",
  "femmes-robes",
  "femmes-chaussures",
  "chemises-hommes",
  "chaussures-hommes",
  "montres-hommes",
  "montres-femmes",
  "femmes-sacs",
  "femmes-bijoux",
  "lunettes de soleil",
  "automobile",
  "moto",
  "éclairage",
];
let catégoriesEng = [];
const response = await axios.get("https://dummyjson.com/products/categories");
for (let cat of response.data) {
  catégoriesEng.push(cat);
}

const driver = neo4j.driver("neo4j+s://d392851f.databases.neo4j.io:7687", neo4j.auth.basic("neo4j", "_O59q6Brq-ytrT3TpffQQ6fIVimQjzrzPNl71auAqm8"))
const session = driver.session()
// for (let i of catégoriesFr){
//     try {
//         const result = await session.run(
//           `Create (n:Category {
//             categoryName:"${capitalizeFirstLetter(i)}",
//             categoryDescription:"None"
//           }) return (n)`,
//         )

//       }catch (e){
//         console.log(e)
//       }
//        finally {
//         console.log("Done")
//     }
// }



// let Produits = [];
// const res = await axios.get("https://dummyjson.com/products?limit=100");
// for (let Prod of res.data.products) {
//   Produits.push(Prod);
// }

// for (let i of Produits) {
//   try {
//     await session.run(
//       `
//             CREATE (p:Product {
//             ProductName:"${i.title}",
//             ProductDescription:"${i.description}",
//             ProductPrice:"${i.price}",
//             ProductStock:"${i.stock}",
//             ProductBrand:"${i.brand}"
//           })
//           with p
//           MATCH(c:Category{categoryName:"${capitalizeFirstLetter(catégoriesFr[catégoriesEng.indexOf(i.category)])}"})
//           CREATE (p)-[:CategorisedBy]->(c)`
//     );
//   } catch (e) {
//     console.log(e);
//   } finally {
//     console.log("Done");
//   }

// let Utilisateurs = [];
// const resp = await axios.get("https://dummyjson.com/users?limit=100");

// for (let Prod of resp.data.users) {
//   Utilisateurs.push(Prod);
// }


// for (let i of Utilisateurs) {
//   try {
//     await session.run(
//       `            
//       CREATE (u:User {
//         id:${i.id},
//         email: "${i.email}",
//         password:"${i.password}",
//         firstName: "${i.firstName}",
//         lastName: "${i.lastName}",
//         dateOfBirth: "${i.birthDate}",
//         phoneNumber: "${i.phone}",
//         sexe:"${i.gender}"
//       })
//     `
//     );
//   } catch (e) {
//     console.log(e);
//   } finally {
//     console.log("Done");
//   }
// }

let Commandes = [];
const res = await axios.get("https://dummyjson.com/carts");
for (let Prod of res.data.carts) {
    Commandes.push(Prod);
}


for (let i of Commandes) {
    const  prods=i.products.map(product => product.title)
  try {


    // await session.run(
    //     `
    //         MATCH (u:User) WHERE u.id = ${i.userId}
    //         Merge (u)-[:Placer]->(c:Commande {
    //             amount: "${i.total} DA",
    //             id: ${i.id}
    //             })

    //         `
    // );
    for (let  x of prods){
        await session.run(
            `
            match (c:Commande {
                id: ${i.id}
                })
            match(p:Product {ProductName:"${x}" }) 
            create (c)-[r:Contient]->(p)
            return r
                `
        );
    }


  } catch (e) {
    console.log(e);
  } finally {
    console.log("Done");
  }
}
await driver.close();