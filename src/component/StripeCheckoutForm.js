import {
  PaymentElement,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { createPaymentIntent } from "../functions/stripe";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

const StripeCheckoutForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));

  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");
  const [cartTotal, setCartTotal] = useState(0);

  const stripe = useStripe();
  const elements = useElements();

  //
  useEffect(() => {
    createPaymentIntent(user.token).then((res) => {
      console.log("create payment intent", JSON.stringify(res.data));
      setClientSecret(res.data.clientSecret);
      setCartTotal(res.data.cartTotal);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Vérifiez si elements.getElement(CardElement) renvoie un élément valide
      const cardElement = elements.getElement(CardElement);

      if (!cardElement) {
        // Gérez le cas où l'élément de carte n'est pas disponible
        console.error("Card element not found");
        return;
      }

      setProcessing(true);

      const payload = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: e.target.name.value,
          },
        },
      });

      if (payload.error) {
        setError(`Payment failed ${payload.error.message}`);
      } else {
        // Traitement du paiement réussi ici
        // Créer une commande et enregistrez-la dans la base de données pour que l'administrateur la traite
        // Vider le panier de l'utilisateur depuis le store Redux et le stockage Redux
        console.log(JSON.stringify(payload, null, 4));
        setSucceeded(true);
      }
    } catch (error) {
      // Gestion des erreurs ici
      console.error("Error during payment confirmation:", error);
      setError("An error occurred during payment confirmation.");
    } finally {
      setProcessing(false);
    }
  };

  const handleChange = async (e) => {
    // Listen for changes in the card element
    setDisabled(e.empty); //disable pay button if error
    setError(e.error ? e.error.message : ""); // show error message
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  const cardStyle = {
    width: "auto",
  };

  // const cartStyle = {
  //   style: {
  //     base: {
  //       color: "#32325d",
  //       fontFamily: "Arial, sans-serif",
  //       fontSmoothing: "antialiased",
  //       fontSize: "16px",
  //       "::placeholder": {
  //         color: "#32325d",
  //       },
  //     },
  //     invalid: {
  //       color: "#fa755a",
  //       iconColor: "#fa755a",
  //     },
  //   },
  // };

  return (
    <>
      <div className="card" style={cardStyle}>
        <div className="card-body">
          <h5 className="card-title">{`${cartTotal} euros`}</h5>
          <h6 className="card-subtitle mb-2 text-body-secondary">
            Paiement by Stripe
          </h6>
          <p className="card-text">
            <form
              id="payment-form"
              className="stripe-form bg-white "
              onSubmit={handleSubmit}
            >
              <CardElement
                id="card-element"
                options={paymentElementOptions}
                // options={cartStyle}
                className="mb-3"
                onChange={handleChange}
              ></CardElement>
              <button
                disabled={processing || disabled || succeeded}
                id="submit"
                className="stripe-button"
              >
                <span id="button-text">
                  {processing ? (
                    <div className="spinner" id="spinner"></div>
                  ) : (
                    "Pay now"
                  )}
                </span>
              </button>
              <br />
              {error && (
                <div className="card-error text-danger" role="alert">
                  {error}
                </div>
              )}
              {succeeded && (
                <div className="alert alert-success" role="alert">
                  "Paiement réalisé avec succès"
                  <br />
                  <Link to="/user/history">See your purchase history</Link>
                </div>
              )}
            </form>
          </p>
          <a href="/cart" className="card-link">
            Cart{" "}
          </a>
          <a href="/checkout" className="card-link">
            checkout{" "}
          </a>
        </div>
      </div>
    </>
  );
};
export default StripeCheckoutForm;
