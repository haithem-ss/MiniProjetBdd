import React, { useEffect } from "react";
import ProductCard from "../assets/ProductCard";
import ArrowPagination from "../assets/pagination/ArrowPagination";
import Spinner from "@atlaskit/spinner";
import axios from "axios";
import { useLocation } from "react-router";
export default function SearchPage(userDetails) {
  const [currentPagination, setCurrentPagination] = React.useState(1);
  const [pageProducts, setPageProducts] = React.useState([]);
  const [pages, setPages] = React.useState([]);
  const location = useLocation();
  const [data, setData] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  useEffect(() => {
    setData(location.state);
  }, []);
  console.log("data", data);

  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  useEffect(() => {
    try {
      const categoryNames = data.searchedItems.map(
        (category) => category.productCategory
      );
      const uniqueCategoryNames = [...new Set(categoryNames)];

      if (categoryNames.length > 0) {
        setLoading(false);
        setCategories(uniqueCategoryNames);
      }
    } catch (error) {
      console.log("error", error);
    }
  }, [data]);

  console.log("categories", categories);
  useEffect(() => {
    try {
      const product = data.searchedItems.map((product) => {
        return {
          title: product.ProductName,
          price: product.ProductPrice,
          image: product.ProductImage,
          description: product.ProductDescription,
          brand: product.ProductBrand,
        };
      });
      const deleteDuplicates = (arr) => {
        if (arr.length === 0) return [];
        let unique = [arr[0]];
        for (let i = 1; i < arr.length; i++) {
          if (arr[i].title !== unique[unique.length - 1].title) {
            unique.push(arr[i]);
          }
        }
        return unique;
      };
      const uniqueProduct = deleteDuplicates(product);
      if (product) {
        setLoading(false);
        setProducts(uniqueProduct);
      }
    } catch (error) {
      console.log("error", error);
    }
  }, [data]);
  console.log("products", products);
  React.useEffect(() => {
    console.log(products.length / 12);
    let p = [];
    for (let i = 1; i <= products.length / 12 + 1; i++) {
      p.push(i);
    }
    setPages(p);
  }, [products]);
  React.useEffect(() => {
    PaginationAnimation();
    setTimeout(() => {
      setPageProducts(
        products.slice((currentPagination - 1) * 12, currentPagination * 12)
      );
    }, 600);
  }, [currentPagination]);
  const filterByCategory = (category) => {
    console.log("category", category);
    if (category === "catégorie") {
      const product = data.searchedItems.map((product) => {
        return {
          title: product.ProductName,
          price: product.ProductPrice,
          image: product.ProductImage,
          description: product.ProductDescription,
          brand: product.ProductBrand,
        };
      });
      const deleteDuplicates = (arr) => {
        if (arr.length === 0) return [];
        let unique = [arr[0]];
        for (let i = 1; i < arr.length; i++) {
          if (arr[i].title !== unique[unique.length - 1].title) {
            unique.push(arr[i]);
          }
        }
        return unique;
      };
      const uniqueProduct = deleteDuplicates(product);
      if (product) {
        setLoading(false);
        setProducts(uniqueProduct);
      }
    } else {
      const filteredProducts = data.searchedItems.filter(
        (product) => product.productCategory === category
      );
      const product = filteredProducts.map((product) => {
        return {
          title: product.ProductName,
          price: product.ProductPrice,
          image: product.ProductImage,
          description: product.ProductDescription,
          brand: product.ProductBrand,
        };
      });
      const deleteDuplicates = (arr) => {
        if (arr.length === 0) return [];
        let unique = [arr[0]];
        for (let i = 1; i < arr.length; i++) {
          if (arr[i].title !== unique[unique.length - 1].title) {
            unique.push(arr[i]);
          }
        }
        return unique;
      };
      const uniqueProduct = deleteDuplicates(product);
      if (product) {
        setLoading(false);
        setProducts(uniqueProduct);
      }
    }
  };

  const Pagination = () => (
    <div className="pagination">
      <button className="arrow" onClick={pervPage}>
        <ArrowPagination />
      </button>
      <div className="pagesContainer">
        {pages.map((p) => (
          <button
            onClick={
              currentPagination - 1 != pages.indexOf(p)
                ? () => {
                    setCurrentPagination(pages.indexOf(p) + 1);
                  }
                : {}
            }
            className={
              currentPagination - 1 === pages.indexOf(p)
                ? "page active"
                : "page"
            }
          >
            {p}
          </button>
        ))}
      </div>
      <button className="arrow inverted" onClick={nextPage}>
        <ArrowPagination />
      </button>
    </div>
  );
  const pervPage = () => {
    if (currentPagination > 1) {
      setCurrentPagination((val) => val - 1);
    }
  };
  const nextPage = () => {
    if (currentPagination < pages[pages.length - 1]) {
      setCurrentPagination((val) => val + 1);
    }
  };
  const PaginationAnimation = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    setTimeout(() => {
      setLoading(true);
    }, 500);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };
  const TopBar = () => (
    <div style={{ paddingInline: "3rem" }}>
      <h2>Résultats de la rehcerche</h2>
    </div>
  );
  const CatsBar = () => {
    return (
      <>
        {loading === false ? (
          <div className="ClassesWrapper">
            <button
              className="active"
              onClick={() => filterByCategory("catégorie")}
            >
              catégorie
            </button>
            {categories.map((cat) => (
              <button onClick={() => filterByCategory(cat)}>{cat}</button>
            ))}
          </div>
        ) : null}
      </>
    );
  };
  return (
    <section>
      <TopBar />
      <CatsBar />

      {loading === false && pageProducts.length != 0 ? (
        <>
          <div className="SearchResultContainer">
            {pageProducts.map((item) => (
              <ProductCard
                title={item.title}
                brand={item.brand}
                description={item.description}
                price={item.price}
              ></ProductCard>
            ))}
          </div>
          <Pagination />
        </>
      ) : (
        <div
          style={{
            margin: "auto",
            width: "fit-content",
            marginTop: "25vh",
          }}
        >
          <Spinner size={"large"} />
        </div>
      )}
    </section>
  );
}
