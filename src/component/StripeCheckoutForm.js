import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import { useEffect, useState } from "react";

const StripeCheckoutForm = ({ cartTotal }) => {
  const [message, setMessage] = useState(null);

  const [isLoading, setIsLoading] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    if (!stripe) {
      return;
    }

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);

      const payload = await stripe.confirmPayment({
        elements,
        confirmParams: {
          // Make sure to change this to your payment completion page
          return_url: "http://localhost:3000",
        },
        redirect: "if_required",
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
      setIsLoading(false);
    }
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  const cardStyle = {
    width: "auto",
  };

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
              <PaymentElement
                id="payment-element"
                options={paymentElementOptions}
              />
              <button
                disabled={isLoading || !stripe || !elements}
                id="submit"
                className="stripe-button"
              >
                <span id="button-text">
                  {isLoading ? (
                    <div className="spinner" id="spinner"></div>
                  ) : (
                    "Pay now"
                  )}
                </span>
              </button>
              {/* Show any error or success messages */}
              {message && <div id="payment-message">{message}</div>}
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
