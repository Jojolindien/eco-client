import React, { useEffect, useState } from "react";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import UserNav from "../../component/nav/UserNav";
import { getUserOrders } from "../../functions/user";
import { toast } from "react-toastify";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import ShowPaymentInfo from "../../component/cards/ShowPaymentInfo";

const History = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useSelector((state) => ({ ...state }), shallowEqual);

  useEffect(() => {
    loadUserOrders();
  }, [user]);

  const loadUserOrders = () => {
    getUserOrders(user.token).then((res) => {
      console.log(JSON.stringify(res, null, 2));
      setOrders(res);
    });
  };

  const showOrderInTable = (order) => (
    <table className="table table-bordered">
      <thead class="table-active">
        <tr>
          <th scope="col">Title</th>
          <th scope="col">Price</th>
          <th scope="col">Brand</th>
          <th scope="col">Color</th>
          <th scope="col">Count</th>
          <th scope="col">Shipping</th>
        </tr>
      </thead>
      <tbody>
        {order.products.map((p, i) => (
          <tr key={i}>
            <td>
              <b>{p.product.title}</b>
            </td>
            <td>{p.product.price}</td>
            <td>{p.product.brand}</td>
            <td>{p.color}</td>
            <td>{p.count}</td>
            <td>
              {p.product.shipping === "Yes" ? (
                <CheckCircleOutlined style={{ color: "green" }} />
              ) : (
                <CloseCircleOutlined style={{ color: "red" }} />
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const showEachOrders = () =>
    orders.map((order, i) => (
      <div key={i} className="m-5 p-3 card">
        <ShowPaymentInfo order={order} />
        {showOrderInTable(order)}
        <div className="row">
          <div className="col">
            <p>Download PDF</p>
          </div>
        </div>
      </div>
    ));

  return (
    <div className="container-fluid">
      <div className="row my-5">
        <div className="col-md-2">
          <UserNav />
        </div>
        <div className="col text-center">
          <h4>
            user history : <br />
            {orders.length ? "User purchase orders" : "No purchase order"}
          </h4>
          {showEachOrders()}
        </div>
      </div>
    </div>
  );
};

export default History;
