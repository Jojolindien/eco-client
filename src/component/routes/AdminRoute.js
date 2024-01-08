import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { shallowEqual, useSelector } from "react-redux";
import LoadingToRedirect from "./LoadingToRedirect";
import { currentAdmin } from "../../functions/auth";

const AdminRoute = () => {
  const user = useSelector((state) => state.user, shallowEqual);
  const [ok, setOk] = useState(false);

  useEffect(() => {
    if (user && user.token) {
      currentAdmin(user.token)
        .then((res) => {
          console.log("CURRENT ADMIN RES", res);
          setOk(true);
        })
        .catch((error) => {
          console.error("Error while fetching current admin:", error);
          // Traitement d'erreur supplémentaire si nécessaire
          setOk(false);
        });
    }
  }, [user]);

  return ok ? <Outlet /> : <LoadingToRedirect />;
};

export default AdminRoute;
