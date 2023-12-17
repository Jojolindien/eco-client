import { useEffect, useState } from "react";
import night from "../night.jpg";
import { getProductByCount } from "../functions/product";
import ProductCard from "../component/cards/ProductCard";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = async () => {
    setLoading(true);
    getProductByCount(6).then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  };

  return (
    <>
      <div className="jumbotron my-4 text-center mx-auto">
        {loading ? <h4>Loading ... </h4> : <h1>All products</h1>}
      </div>
      <div className="container">
        <div className="row my-4">
          {products.map((product) => (
            <div key={product._id} className="col">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
        {/* {JSON.stringify(products)} */}
      </div>
      <img src={night} className="img-fluid" alt="img" />
    </>
  );
};

export default Home;
