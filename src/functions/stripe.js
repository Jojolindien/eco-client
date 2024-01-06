import axios from "axios";

// Cette fonction renvoie une promesse (Promise) car axios.post renvoie une promesse
// wiull give the client secret
export const createPaymentIntent = (authToken) => {
  return axios.post(
    `${process.env.REACT_APP_API}/create-payment-intent`,
    {},
    {
      headers: { authToken },
    }
  );
};
