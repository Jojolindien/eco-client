import { Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/Home";
import Header from "./component/nav/Header";
import RegisterComplete from "./pages/auth/RegisterComplete";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "../src/firebase";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import ForgotPassword from "./pages/auth/ForgotPassword";

const App = () => {
  const dispatch = useDispatch();

  //check firebase auth state
  useEffect(() => {
    const unsusbcribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        // console.log("user", user);
        dispatch({
          type: "LOGGED_IN_USER",
          payload: {
            email: user.email,
            token: idTokenResult.token,
          },
        });
      } else {
        console.log("not logged");
        // toast.info("not logged");
      }
    });
    //cleanup : on rend l'écouteur onAuthStateChanged: inactif
    return () => unsusbcribe();
  }, [dispatch]);

  return (
    <div className="bg-dark text-white">
      <Header />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register/complete" element={<RegisterComplete />} />
        <Route path="/forgot/password" element={<ForgotPassword />} />
      </Routes>
    </div>
  );
};

export default App;
