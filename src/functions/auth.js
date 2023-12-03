import axios from "axios";

// ICI ON ENVOI LES REQUETE AXIOS

//send authtoken in post request
export const createOrUpdateUser = async (authtoken) => {
  return await axios.post(
    process.env.REACT_APP_API + "/create-or-update-user",
    {},
    {
      headers: {
        authtoken: authtoken,
      },
    }
  );
};

//send authtoken in post request
export const currentUser = async (authtoken) => {
  return await axios.post(
    process.env.REACT_APP_API + "/current-user",
    {},
    {
      headers: {
        authtoken: authtoken,
      },
    }
  );
};

export const currentAdmin = async (authtoken) => {
  return await axios.post(
    process.env.REACT_APP_API + "/current-admin",
    {},
    {
      headers: {
        authtoken: authtoken,
      },
    }
  );
};
