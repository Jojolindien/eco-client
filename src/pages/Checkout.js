//

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { emptyUserCart, getUserCart, saveUserAddress } from "../functions/user";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { currentUser } from "../functions/auth";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState("");
  const [addressSaved, setAddressSaved] = useState(false);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));
  const navigate = useNavigate();

  useEffect(() => {
    getUserCart(user.token).then((res) => {
      console.log("user cart res", JSON.stringify(res, null, 4));
      setProducts(res.products);
      setTotal(res.cartTotal);
    });
    currentUser(user.token).then((res) => {
      if (res.data.address) {
        setAddress(res.data.address);
      }
    });
  }, [user.token]);

  const saveAdressToDb = () => {
    saveUserAddress(user.token, address).then((res) => {
      if (res.ok) {
        setAddressSaved(true);
        toast.success("Address saved");
      }
    });
  };

  const emptycart = () => {
    //remove from local storage
    if (typeof window !== "undefined") {
      localStorage.removeItem("cart");
    }
    //remove from redux
    dispatch({ type: "ADD_TO_CART", payload: [] });
    //remove from backend
    emptyUserCart(user.token).then((res) => {
      setProducts([]);
      setTotal(0);

      toast.info("deleted");
    });
  };

  return (
    <div className=" vh-100">
      <div className="row mt-5 px-5">
        <div className="col-md-6">
          <h4>Delevery adress</h4>
          <br />
          <br />
          <ReactQuill
            theme="snow"
            value={address}
            onChange={setAddress}
            className="bg-white text-black"
          />
          <button className="btn btn-primary mt-4" onClick={saveAdressToDb}>
            Save
          </button>
          <hr />
          <h4>Got Coupon ?</h4>
          <br />
          coupon input and applu button
        </div>

        <div className="col-md-6">
          <h4>Order Summary</h4>
          <hr />
          <p>{`Products : ${products.length}`}</p>
          <hr />
          <p>List of Products :</p>

          {products.map((p, i) => (
            <div key={i}>
              {p.product.title} ({p.color}) x {p.count} = {p.product.price} $
            </div>
          ))}

          <hr />
          <p>{`Cart total : ${total} $`}</p>
          <div className="row">
            <div className="col-md-6">
              <button
                className="btn btn-primary"
                disabled={!addressSaved || !products.length}
                onClick={() => navigate("/user/payment")}
              >
                {!addressSaved ? "Confirm address to order" : "order"}
              </button>
            </div>
            <div className="col-md-6">
              <button
                className="btn btn-primary"
                onClick={emptycart}
                disabled={!products.length}
              >
                Empty cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
