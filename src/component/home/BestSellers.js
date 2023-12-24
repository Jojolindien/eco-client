import React, { useEffect, useState } from "react";
import { Pagination } from "antd";
import ProductCard from "../cards/ProductCard";
import { getProducts, getProductsCount } from "../../functions/product";

const BestSellers = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [productsCount, setProductsCount] = useState(0);

  useEffect(() => {
    loadAllProducts();
  }, [page]);

  useEffect(() => {
    getProductsCount().then((res) => setProductsCount(res.data));
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    //sort, order, limit
    getProducts("sold", "desc", page).then((res) => setProducts(res.data));
    setLoading(false);
  };

  return (
    <>
      <h4
        className="text-center p-3 mt-5 mb-5 display-7 jumbotron"
        style={{
          backgroundColor: "#000000", // Remplacez par la couleur de fond souhaitée
          padding: "20px", // Ajoutez un remplissage pour améliorer l'apparence
        }}
      >
        Best Sellers
      </h4>
      <br />
      <div className="container">
        <div className="row my-5">
          {products.map((product) => (
            <div key={product._id} className="col">
              <ProductCard product={product} loading={loading} />
            </div>
          ))}
        </div>
      </div>
      <div className="row">
        <nav className="col-md-4 offset-md-4 text-center pt-5 p-3">
          <Pagination
            defaultCurrent={page}
            total={Math.ceil(productsCount / 3) * 10}
            onChange={(value) => setPage(value)}
            className="text-white"
          />
        </nav>
      </div>
    </>
  );
};

export default BestSellers;
