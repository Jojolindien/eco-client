import axios from "axios";

export const userCart = async (cart, authtoken) => {
  try {
    const response = await axios.post(
      process.env.REACT_APP_API + "/user/cart",
      { cart },
      {
        headers: {
          authtoken: authtoken,
        },
      }
    );

    return response.data; // Retourne les données de la réponse si la requête réussit
  } catch (error) {
    // Gère les erreurs ici
    console.error("Error while updating user cart:", error);
    throw error; // Répète l'erreur pour qu'elle soit gérée par le code appelant
  }
};

export const getUserCart = async (authtoken) => {
  try {
    const response = await axios.get(
      process.env.REACT_APP_API + "/user/cart",

      {
        headers: {
          authtoken: authtoken,
        },
      }
    );

    return response.data; // Retourne les données de la réponse si la requête réussit
  } catch (error) {
    // Gère les erreurs ici
    console.error("Error while getting user cart:", error);
    throw error; // Répète l'erreur pour qu'elle soit gérée par le code appelant
  }
};

export const emptyUserCart = async (authtoken) => {
  try {
    const response = await axios.delete(
      process.env.REACT_APP_API + "/user/cart",

      {
        headers: {
          authtoken: authtoken,
        },
      }
    );

    if (response && response.data) {
      return response.data; // Retourne les données de la réponse si la requête réussit
    } else {
      throw new Error("Empty response or missing data");
    }
  } catch (error) {
    // Gère les erreurs ici
    console.error("Error while deleting user cart:", error);
    throw error; // Répète l'erreur pour qu'elle soit gérée par le code appelant
  }
};

export const saveUserAddress = async (authtoken, address) => {
  try {
    const response = await axios.post(
      process.env.REACT_APP_API + "/user/address",
      { address },
      {
        headers: {
          authtoken: authtoken,
        },
      }
    );

    return response.data; // Retourne les données de la réponse si la requête réussit
  } catch (error) {
    // Gère les erreurs ici
    console.error("Error while updating user cart:", error);
    throw error; // Répète l'erreur pour qu'elle soit gérée par le code appelant
  }
};

export const createOrder = async (stripeResponse, authtoken) => {
  console.log(stripeResponse);
  try {
    const response = await axios.post(
      process.env.REACT_APP_API + "/user/order",
      { stripeResponse },
      {
        headers: {
          authtoken: authtoken,
        },
      }
    );

    return response.data; // Retourne les données de la réponse si la requête réussit
  } catch (error) {
    // Gère les erreurs ici
    console.error("Error while creating order", error);
    throw error; // Répète l'erreur pour qu'elle soit gérée par le code appelant
  }
};

export const getUserOrders = async (authtoken) => {
  try {
    const response = await axios.get(
      process.env.REACT_APP_API + "/user/orders",

      {
        headers: {
          authtoken: authtoken,
        },
      }
    );

    return response.data; // Retourne les données de la réponse si la requête réussit
  } catch (error) {
    // Gère les erreurs ici
    console.error("Error while getting user cart:", error);
    throw error; // Répète l'erreur pour qu'elle soit gérée par le code appelant
  }
};
