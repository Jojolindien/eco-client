import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRelatedProductsFromCategory } from "../../functions/category";
import ProductCard from "../../component/cards/ProductCard";

const CategoryHome = () => {
  const [category, setCategory] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  let { slug } = useParams();

  useEffect(() => {
    setLoading(true);
    getRelatedProductsFromCategory(slug).then((c) => {
      console.log(c);
      // console.log(JSON.stringify(c, null, 4));
      setCategory(c.category);
      setProducts(c.products);
    });
    setLoading(false);
  }, []);

  return (
    <div className="container vh-100">
      <div className="row">
        <div className="col">
          {loading ? (
            <h4 className="texgt-center p-3 mt-5 mb-5 display-4 jumbotron">
              LOADING ...{" "}
            </h4>
          ) : (
            <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
              {products.length} {products < 2 ? "product" : "products"} found in
              the {category.name} category
            </h4>
          )}
        </div>
      </div>
      <div className="row mx-auto">
        {products.map((p) => (
          <div className="col text-center" key={p._id}>
            <ProductCard product={p} />
          </div>
        ))}
      </div>
      <br className="m-5" />
    </div>
  );
};

export default CategoryHome;
