import { useEffect, useState } from "react";
import { getProduct } from "../functions/product";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import SingleProduct from "../component/cards/SingleProduct";

const Product = () => {
  const [product, setProduct] = useState({});

  //redux
  const { user } = useSelector((state) => ({ ...state }));

  const { slug } = useParams();

  //this useEffect run first
  useEffect(() => {
    loadSingleProduct();
  }, [slug]);

  const loadSingleProduct = () => {
    getProduct(slug).then((res) => {
      setProduct(res.data);
    });
  };

  return (
    <div className="container-fluid">
      <div className="row pt-4">
        <SingleProduct product={product} />
      </div>
      <div className="row">
        <div className="col text-center pt-5 pb-5">
          <hr />
          <h5>Related products</h5>
          <hr />
          {/* <div className="row pb-5">
            {related.length ? (
              related.map((r) => (
                <div key={r.id} className="col-md-2">
                  <ProductCard product={r} />
                </div>
              ))
            ) : (
              <div className="text-center col">"No product found"</div>
            )}
          </div>
          {JSON.stringify(related.length)} */}
        </div>
      </div>
    </div>
  );
};

export default Product;
