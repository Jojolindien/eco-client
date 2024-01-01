import ModalImage from "react-modal-image";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

const ProductCardInCheckout = ({ p }) => {
  const color = ["Black", "Brown", "Silver", "White", "Blue"];

  const dispatch = useDispatch();

  const handleChangeColor = (e) => {
    let cart = [];
    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      //push new product to cart
      cart.map((product, i) => {
        if (product._id === p._id) {
          cart[i].color = e.target.value;
        }
      });
      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };

  const handleCountChange = (e) => {
    console.log("count", e.target.value);
    console.log("quantity", p.quantity);
    let count = e.target.value < 1 ? 1 : e.target.value;

    if (count > p.quantity) {
      toast.error(`Max available quantity : ${p.quantity}`);
      return;
    }

    let cart = [];
    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      //push new product to cart
      cart.map((product, i) => {
        if (product._id === p._id) {
          cart[i].count = count;
        }
      });
      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };

  const handleRemove = () => {
    let cart = [];
    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      //push new product to cart
      cart.map((product, i) => {
        if (product._id === p._id) {
          cart.splice(i, 1);
        }
      });
      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };

  return (
    <tbody>
      <tr>
        <td>
          <div style={{ width: "100px", height: "auto" }}>
            {p.images.length ? (
              <ModalImage
                style={{
                  width: "100px",
                  height: "10%",
                  maxHeight: "150px",
                  objectFit: "cover",
                }}
                small={p.images[0].url}
                large={p.images[0].url}
                alt="image"
              />
            ) : (
              "No image"
            )}
          </div>
        </td>
        <td>{p.title}</td>
        <td>{p.price}</td>
        <td>{p.brand}</td>
        <td>
          <select
            onChange={handleChangeColor}
            name="color"
            className="form-control"
          >
            {p.color ? (
              <option value={p.color} key={p.color}>
                {p.color}
              </option>
            ) : (
              <option>Select</option>
            )}
            {color
              .filter((c) => c !== p.color)
              .map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
          </select>
        </td>
        <td>
          <input
            type="number"
            className="form-control"
            value={p.count}
            onChange={handleCountChange}
          ></input>
        </td>
        <td className="text-center">
          {p.shipping === "Yes" ? (
            <CheckCircleOutlined className="text-success" />
          ) : (
            <CloseCircleOutlined className="text-danger" />
          )}
        </td>
        <td className="text-center">
          <CloseCircleOutlined
            onClick={() => handleRemove(p._id)}
            className="text-danger"
          />
        </td>
      </tr>
    </tbody>
  );
};

export default ProductCardInCheckout;
