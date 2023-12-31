import { useEffect, useState } from "react";
import night from "../night.jpg";
import { getProducts } from "../functions/product";
import Jumbotron from "../component/cards/Jumbotron";
import NewArrivals from "../component/home/NewArrivals";
import BestSellers from "../component/home/BestSellers";
import CategoryList from "../component/category/CategoryList";
import SubCategoryList from "../component/sub/subCategoryList";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAllProducts();
  }, []);

  //sort, order, limit
  const loadAllProducts = async () => {
    setLoading(true);
    getProducts("createdAt", "desc", "3").then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  };

  return (
    <div
      style={{
        backgroundImage: `url(${night})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh", // Ajustez la hauteur selon vos besoins
        display: "flex",
        flexDirection: "column",
      }}
    >
      <br />
      <div className="jumbotron text-center">
        {loading ? (
          <h4>Loading ... </h4>
        ) : (
          <h4 className="my-5">
            <Jumbotron
              text={[
                "New scam coming",
                "Hurry, take your chance to be scammed !",
              ]}
            />
          </h4>
        )}
      </div>
      <br />
      <NewArrivals />
      <br />
      <BestSellers />
      <br />
      <CategoryList />
      <br />
      <SubCategoryList />
    </div>
  );
};

export default Home;
