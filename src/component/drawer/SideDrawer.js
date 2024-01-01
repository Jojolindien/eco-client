import { Drawer, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const SideDrawer = () => {
  const dispatch = useDispatch();
  const { drawer, cart } = useSelector((state) => ({ ...state }));

  const imageStyle = {
    width: "100%",
    height: "100px",
    objectFit: "cover",
  };

  return (
    <Drawer
      className="text-center"
      title={`Cart : ${cart.length} ${cart.length > 1 ? "items" : "item"}`}
      placement="right"
      open={drawer}
      onClose={() => {
        dispatch({ type: "SET_VISIBLE", payload: false });
      }}
    >
      {cart.map((p) => (
        <div key={p._id} className="row">
          <div className="col">
            {p.images[0] ? (
              <>
                <img src={p.images[0].url} style={imageStyle} />
                <p className="text-center bg-secondary text-light">
                  {p.title} x {p.count}
                </p>
              </>
            ) : (
              <>
                <p style={imageStyle}>No image</p>
                <p className="text-center bg-secondary text-light">
                  {p.title} x {p.count}
                </p>
              </>
            )}
          </div>
        </div>
      ))}
      <Link to="/cart">
        <button
          className="text-center btn btn-primary"
          onClick={() => {
            dispatch({
              type: "SET_VISIBLE",
              payload: false,
            });
          }}
        >
          Go to Cart
        </button>
      </Link>
    </Drawer>
  );
};

export default SideDrawer;
