import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ProductCardInCheckout from "../component/cards/ProductCardInCheckout";

const Cart = () => {
  const { cart, user } = useSelector((state) => state);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  // Fonction qui simule l'ajout d'un article au panier
  const getTotal = () => {
    return cart.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  const saveOrderToDb = () => {};

  const showCartItems = () => (
    <table className="table table-bordered">
      <thead className="thead-light">
        <tr className="text-center">
          <th scope="col">Image</th>
          <th scope="col">Title</th>
          <th scope="col">Price</th>
          <th scope="col">Brand</th>
          <th scope="col">Color</th>
          <th scope="col">Count</th>
          <th scope="col">Shipping</th>
          <th scope="col">Remove</th>
        </tr>
      </thead>
      {cart.map((p) => (
        <ProductCardInCheckout key={p._id} p={p} />
      ))}
    </table>
  );

  return (
    <div className="container-fluid vh-100 pt-2">
      <div className="row">
        <div className="col-md-8">
          <h2>
            Cart : {cart.length} {cart.length > 1 ? "items" : "item"}
          </h2>
          {!cart.length ? (
            <p>
              Empty Card. <Link to="/shop">continue shopping</Link>
            </p>
          ) : (
            showCartItems()
          )}
        </div>
        <div className="col-md-4 pt-2">
          <h4>Order Summary</h4>
          <hr />
          <p>Products</p>
          {cart.map((c, i) => (
            <div key={i}>
              <p>
                {c.title} x {c.count} = $ {c.price * c.count}
              </p>
            </div>
          ))}
          <hr />
          Total: <b>$ {getTotal()}</b>
          <hr />
          {user ? (
            <button
              onClick={saveOrderToDb}
              className="btn btn-sm btn-primary mt-2"
              disabled={!cart.length}
            >
              Proceed to Checkout
            </button>
          ) : (
            <button
              onClick={() => {
                navigate("/login", {
                  state: { from: `/cart` },
                });
              }}
              className="btn btn-sm btn-primary mt-2"
            >
              Login to Checkout
            </button>
          )}
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
