import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripeCheckoutForm from "../component/StripeCheckoutForm";
import "../stripe.css";
import { createPaymentIntent } from "../functions/stripe";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY_BANKCO);

const Payment = () => {
  const [clientSecret, setClientSecret] = useState("");
  const [cartTotal, setCartTotal] = useState(0);

  const { user } = useSelector((state) => ({ ...state }), shallowEqual);

  useEffect(() => {
    createPaymentIntent(user.token).then((res) => {
      console.log(
        "create payment intent",
        JSON.stringify(res.data.clientSecret)
      );
      if (!res) {
        console.log("no cart");
        return;
      }
      setClientSecret(res.data.clientSecret);
      setCartTotal(res.data.cartTotal);
    });
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="container p-5 text-center vh-100">
      <h3>Complete your purchase</h3>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise} key={clientSecret}>
          <StripeCheckoutForm
            cartTotal={cartTotal}
            clientSecret={clientSecret}
            token={user.token}
          />
        </Elements>
      )}
    </div>
  );
};

export default Payment;
