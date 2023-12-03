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
import { currentUser } from "./functions/auth";
import History from "./pages/user/History";
import UserRoute from "./component/routes/UserRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminRoute from "./component/routes/AdminRoute";
import Password from "./pages/user/Password";

const App = () => {
  const dispatch = useDispatch();

  //check firebase auth state
  useEffect(() => {
    // onAuthStateChanged surveille dynamiquement l'état de l'utilisateur dans firebase
    //permet un affichage différent selon co ou pas
    const unsusbcribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        // console.log("user", user);
        currentUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
          })
          .catch((e) => console.log("error", e));
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
        <Route element={<UserRoute />}>
          <Route path="/user/history" element={<History />} />
          <Route path="/user/password" element={<Password />} />
        </Route>
        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
