import axios from "axios";

export const createProduct = async (product, authtoken) => {
  try {
    // Envoi d'une requête DELETE à l'API pour supprimer une catégorie par son slug
    const response = await axios.post(
      process.env.REACT_APP_API + `/product`,
      product,
      {
        headers: {
          // Ajout du jeton d'authentification dans l'en-tête de la requête
          authtoken,
        },
      }
    );

    // Retourne les données de réponse
    return response;
  } catch (error) {
    // Gestion des erreurs en cas d'échec de la requête
    console.error("Error removing category:", error);
    throw error;
  }
};

export const getProductByCount = async (count) => {
  try {
    // Envoi d'une requête DELETE à l'API pour supprimer une catégorie par son slug
    const response = await axios.get(
      process.env.REACT_APP_API + `/products/${count}`
    );

    // Retourne les données de réponse
    return response;
  } catch (error) {
    // Gestion des erreurs en cas d'échec de la requête
    console.error("Error removing category:", error);
    throw error;
  }
};

export const RemoveProduct = async (slug, authtoken) => {
  // console.log(slug);
  return await axios.delete(process.env.REACT_APP_API + `/product/${slug}`, {
    headers: {
      authtoken,
    },
  });
};

export const getProduct = async (slug) => {
  try {
    // Envoi d'une requête GET à l'API pour obtenir un produit par son slug
    const response = await axios.get(
      process.env.REACT_APP_API + `/product/${slug}`
    );

    // Retourne les données de réponse
    return response;
  } catch (error) {
    // Gestion des erreurs en cas d'échec de la requête
    console.error("Error removing category:", error);
    throw error;
  }
};

export const updateProduct = async (slug, product, authtoken) => {
  try {
    // Envoi d'une requête DELETE à l'API pour supprimer une catégorie par son slug
    const response = await axios.put(
      process.env.REACT_APP_API + `/product/${slug}`,
      product,
      {
        headers: {
          // Ajout du jeton d'authentification dans l'en-tête de la requête
          authtoken,
        },
      }
    );

    // Retourne les données de réponse
    return response;
  } catch (error) {
    // Gestion des erreurs en cas d'échec de la requête
    console.error("Error removing category:", error);
    throw error;
  }
};

export const getProducts = async (sort, order, page) => {
  try {
    // Envoi d'une requête GET à l'API pour obtenir un produit par son slug
    const response = await axios.post(process.env.REACT_APP_API + `/products`, {
      sort,
      order,
      page,
    });

    // Retourne les données de réponse
    return response;
  } catch (error) {
    // Gestion des erreurs en cas d'échec de la requête
    console.error("Error removing category:", error);
    throw error;
  }
};

export const getProductsCount = async (slug) => {
  try {
    // Envoi d'une requête GET à l'API pour obtenir un produit par son slug
    const response = await axios.get(
      process.env.REACT_APP_API + `/products/total`
    );

    // Retourne les données de réponse
    return response;
  } catch (error) {
    // Gestion des erreurs en cas d'échec de la requête
    console.error("Error count category:", error);
    throw error;
  }
};
