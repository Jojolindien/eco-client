import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripeCheckoutForm from "../component/StripeCheckoutForm";
import "../stripe.css";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY_BANKCO);

const Payment = () => {
  // const appearance = {
  //   theme: "stripe",
  // };
  // const options = {
  //   clientSecret,
  //   appearance,
  // };
  const appearance = {
    theme: "stripe",
  };

  return (
    <div className="container p-5 text-center vh-100">
      <h3>Complete your purchase</h3>
      <Elements stripe={stripePromise} options={appearance}>
        <div className="col-md-8 offset-md-2 my-5">
          <StripeCheckoutForm />
        </div>
      </Elements>
    </div>
  );
};

export default Payment;
