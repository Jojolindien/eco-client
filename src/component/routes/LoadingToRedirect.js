import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import night from "../../night.jpg";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const LoadingToRedirect = () => {
  const [count, setCount] = useState(5);
  let navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      //
      setCount((currentCount) => --currentCount);
    }, 1000);
    // redirect once count is equal to 0
    count === 0 &&
      // 1 TEST DE SIGNOUT
      signOut(auth)
        .then(() => {
          dispatch({
            type: "LOGOUT",
            payload: null,
          });
          navigate("/login");
          toast.success("logout successfully");
        })
        .catch((error) => {
          console.log(error);
          toast.error("logout failed", error.message);
        });
    // ou 2  : navigate("/login");
    //cleanup
    return () => clearInterval(interval);
  }, [count]);

  return (
    <div className="position-relative">
      <img src={night} className="img-fluid" alt="img" />
      <h1 className="text-center position-absolute top-50 start-50 translate-middle">
        Please connect. Redirecting in {count}{" "}
        {count > 1 ? "seconds" : "second"}
      </h1>
    </div>
  );
};

export default LoadingToRedirect;
