const ShowPaymentInfo = ({ order }) => {
  return (
    <div>
      <p>
        <span>Order Id : {order.paymentIntent.id}</span>
        {" / "}
        <span>
          Amount :{" "}
          {(order.paymentIntent.amount / 100).toLocaleString("fr-FR", {
            style: "currency",
            currency: "eur",
          })}
        </span>
        {" / "}
        <span>Method : {order.paymentIntent.payment_method_types[0]}</span>
        {" / "}
        <span>Payment :{order.paymentIntent.status}</span>
        {" / "}
        <span>
          Ordered On :
          {new Date(order.paymentIntent.created * 1000).toDateString("fr-FR")}
        </span>
        {" / "}
        <span className="badge bg-primary">
          Status :{order.orderStatus}
        </span>{" "}
      </p>
    </div>
  );
};

export default ShowPaymentInfo;
