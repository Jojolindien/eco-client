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
import CategoryCreate from "./pages/admin/category/CategoryCreate";
import CategoryUpdate from "./pages/admin/category/CategoryUpdate";
import SubCreate from "./pages/admin/sub/SubCreate";
import SubUpdate from "./pages/admin/sub/SubUpdate";
import ProductCreate from "./pages/admin/product/ProductCreate";
import AllProducts from "./pages/admin/product/AllProducts";
import ProductUpdate from "./pages/admin/product/ProductUpdate";
import Product from "./pages/Product";
import CategoryHome from "./pages/category/CategoryHome";
import SubHome from "./pages/sub/SubHome";
import Shop from "./pages/Shop";

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
        <Route path="/product/:slug" element={<Product />} />
        <Route path="/category/:slug" element={<CategoryHome />} />
        <Route path="/sub/:slug" element={<SubHome />} />
        <Route path="/shop" element={<Shop />} />
        <Route element={<UserRoute />}>
          <Route path="/user/history" element={<History />} />
          <Route path="/user/password" element={<Password />} />
        </Route>
        <Route element={<AdminRoute />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/category" element={<CategoryCreate />} />
          <Route path="/admin/category/:slug" element={<CategoryUpdate />} />
          <Route path="/admin/sub" element={<SubCreate />} />
          <Route path="/admin/sub/:slug" element={<SubUpdate />} />
          <Route path="/admin/product" element={<ProductCreate />} />
          <Route path="/admin/product/:slug" element={<ProductUpdate />} />
          <Route path="/admin/products" element={<AllProducts />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
