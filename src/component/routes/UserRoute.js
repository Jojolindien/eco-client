import React from "react";
import { Outlet } from "react-router-dom";
import { shallowEqual, useSelector } from "react-redux";
import LoadingToRedirect from "./LoadingToRedirect";

const UserRoute = () => {
  const user = useSelector((state) => state.user, shallowEqual);

  console.log("User from Redux state:", user);

  //si user avec un token, alors j'affiche
  return user && user.token ? <Outlet /> : <LoadingToRedirect />;
};

export default UserRoute;
