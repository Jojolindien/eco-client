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
