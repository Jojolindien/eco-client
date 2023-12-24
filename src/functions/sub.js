import axios from "axios";

// ICI ON ENVOI LES REQUETE AXIOS

//send authtoken in post request
export const getSubs = async (authtoken) =>
  await axios.get(process.env.REACT_APP_API + "/subs");

export const getSub = async (slug) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API}/sub/${slug}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching sub:", error);
    throw error; // Réexécutez l'erreur pour que le gestionnaire d'erreurs puisse la traiter
  }
};

export const getRelatedProductsFromSub = async (slug) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API}/sub/products/${slug}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching category:", error);
    throw error;
  }
};

export const getSubcategories = async (slug) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API}/sub/products/${slug}`
    );
    console.error(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching sub:", error);
    throw error; // Réexécutez l'erreur pour que le gestionnaire d'erreurs puisse la traiter
  }
};

//slug est ce que je veux modifier, category les nouvelles info, et enfin le token d'admin
export const removeSub = async (slug, authtoken) => {
  try {
    // Envoi d'une requête DELETE à l'API pour supprimer une catégorie par son slug
    const response = await axios.delete(
      process.env.REACT_APP_API + `/sub/${slug}`,
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
    console.error("Error removing sub:", error);
    throw error;
  }
};

export const updateSub = async (slug, sub, authtoken) => {
  try {
    const response = await axios.put(
      process.env.REACT_APP_API + `/sub/${slug}`,
      sub,
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
    console.error("Error updating sub:", error);
    throw error;
  }
};

export const createSub = async (sub, authtoken) => {
  try {
    // Envoi d'une requête DELETE à l'API pour supprimer une catégorie par son slug
    const response = await axios.post(process.env.REACT_APP_API + `/sub`, sub, {
      headers: {
        // Ajout du jeton d'authentification dans l'en-tête de la requête
        authtoken,
      },
    });

    // Retourne les données de réponse
    return response;
  } catch (error) {
    // Gestion des erreurs en cas d'échec de la requête
    console.error("Error removing sub:", error);
    throw error;
  }
};
