import axios from "axios";

const headersWithAuthToken = (authtoken) => ({
  headers: {
    authtoken,
  },
});

export const getCategories = async () =>
  await axios.get(`${process.env.REACT_APP_API}/categories`);

export const getCategory = async (slug) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API}/category/${slug}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching category:", error);
    throw error;
  }
};

export const removeCategory = async (slug, authtoken) => {
  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_API}/category/${slug}`,
      headersWithAuthToken(authtoken)
    );
    return response;
  } catch (error) {
    console.error("Error removing category:", error);
    throw error;
  }
};

export const updateCategory = async (slug, name, authtoken) => {
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_API}/category/${slug}`,
      { name },
      headersWithAuthToken(authtoken)
    );
    return response;
  } catch (error) {
    console.error("Error updating category:", error);
    throw error;
  }
};

export const createCategory = async (category, authtoken) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API}/category`,
      category,
      headersWithAuthToken(authtoken)
    );
    return response;
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
};

export const getAllSubCategoriesFromCategory = async (_id) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API}/category/subs/${_id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching subcategories:", error);
    throw error;
  }
};
