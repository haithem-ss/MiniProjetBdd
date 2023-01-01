import React from "react";
import ProductCard from "../assets/ProductCard"
import ArrowPagination from "../assets/pagination/ArrowPagination";
import Spinner from "@atlaskit/spinner"
export default function SearchPage() {
    const [currentPagination, setCurrentPagination] = React.useState(1)
    const [pageProducts, setPageProducts] = React.useState([])
    const [pages, setPages] = React.useState([])

    const [catégories, setCatégories] = React.useState([
        { nom: "Cat1", description: "Description cat1" },
        { nom: "Cat2", description: "Description cat2" },
        { nom: "Cat3", description: "Description cat3" },
        { nom: "Cat4", description: "Description cat4" },
        { nom: "Cat5", description: "Description cat5" },
        { nom: "Cat6", description: "Description cat6" },
    ])
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
    const [loading, setLoading] = React.useState(false)
    React.useEffect(() => {
        console.log((products.length / 12))
        let p = []
        for (let i = 1; i <= (products.length / 12) + 1; i++) {
            p.push(i)
        }
        setPages(p)
    }, [products])
    React.useEffect(() => {
        PaginationAnimation()
        setTimeout(() => {
            setPageProducts(products.slice((currentPagination - 1) * 12, currentPagination * 12))
        }, 600)
    }, [currentPagination])
    const Pagination = () => (
        <div className="pagination">
            <button className="arrow"
                onClick={pervPage}
            >
                <ArrowPagination />
            </button>
            <div className="pagesContainer">
                {pages.map((p) => <button
                    onClick={currentPagination - 1 != pages.indexOf(p) ? () => { setCurrentPagination(pages.indexOf(p) + 1) }
                        : {}}
                    className={currentPagination - 1 === pages.indexOf(p) ? "page active" : "page"}>{p}</button>)}
            </div>
            <button className="arrow inverted"
                onClick={nextPage}
            >
                <ArrowPagination />

            </button>
        </div>)
    const pervPage = () => {
        if (currentPagination > 1) {
            setCurrentPagination(val => val - 1)
        }
    }
    const nextPage = () => {
        if (currentPagination < pages[pages.length - 1]) {
            setCurrentPagination(val => val + 1)
        }
    }
    const PaginationAnimation = () => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        setTimeout(() => {
            setLoading(true)
        }, 500)
        setTimeout(() => {
            setLoading(false)
        }, 1500)
    }
    const TopBar = () => (
        <div
            style={{ paddingInline: "3rem" }}
        >
            <h2>Résultats de la rehcerche</h2>
        </div>
    )
    const CatsBar = () => {
        return (
            <div className="ClassesWrapper">
                <button className="active">
                    catégorie
                </button>
                {catégories.map((item) => (
                    <button className="">
                        {item.nom}
                    </button>
                )
                )}
            </div>
        )
    }
    return (
        <section >
            <TopBar />
            <CatsBar />

            {loading === false && pageProducts.length != 0 ? <>
                <div
                    className="SearchResultContainer"
                >
                    {pageProducts.map((item) => (
                        <ProductCard title={item.title} brand={item.brand} description={item.description} price={item.price}></ProductCard>
                    ))}
                </div>
                <Pagination />
            </> : <div
                style={{
                    margin: "auto",
                    width: "75vw",
                    marginTop: "25vh"
                }}
            >
                <div>
                    <Spinner
                        size={"large"}
                    />
                </div>

            </div>}
        </section>)

}