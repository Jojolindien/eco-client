import { toast } from "react-toastify";
import React, { useEffect, useState } from "react"; // Ajout de React
import AdminProductCard from "../../../component/cards/AdminProductCard";
import { RemoveProduct, getProductByCount } from "../../../functions/product";
import AdminNav from "../../../component/nav/AdminNav";
import { useSelector } from "react-redux";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = useSelector((state) => state.user);

  //Obtention  des products [] au lancement
  useEffect(() => {
    loadAllProducts();
  }, []); // Le tableau vide [] assure que cette fonction ne sera exécutée qu'une fois lors du montage initial du composant

  const loadAllProducts = () => {
    getProductByCount(100)
      .then((res) => {
        setLoading(false);
        setProducts(res.data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const handleRemove = (slug) => {
    let answer = window.confirm("Confirme delete product ?");
    if (answer) {
      console.log("DELETE : ", slug);
      RemoveProduct(slug, user.token)
        .then((res) => {
          loadAllProducts();
          toast.success(`${res.data.title} has been deleted`);
        })
        .catch((err) => {
          toast.error(err.message);
          console.log(err);
        });
    }
  };

  return (
    <div className="container-fluid">
      <div className="row my-5">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col">
          <h4>Products</h4>

          {loading ? (
            <p>Loading products...</p>
          ) : (
            <div className="row">
              {products.map((product) => (
                <div key={product._id} className="col-md-4 mb-4">
                  <AdminProductCard
                    product={product}
                    handleRemove={handleRemove}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
