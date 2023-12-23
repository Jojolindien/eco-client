import { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { Button, Flex } from "antd";
import { MailOutlined, GoogleOutlined } from "@ant-design/icons";
import {
  GoogleAuthProvider,
  getIdTokenResult,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { createOrUpdateUser } from "../../functions/auth";

import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("stephane.schwender@gmail.com");
  const [password, setPassword] = useState("123456");
  const [loading, setLoading] = useState(false);

  let dispatch = useDispatch();
  let navigate = useNavigate();
  let location = useLocation();
  const provider = new GoogleAuthProvider();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    let intended = location.state;

    if (intended) {
      return;
    } else {
      if (user && user.token) {
        navigate("/");
      }
    }
  }, [user, navigate]);

  const roleBasedRedirect = (res) => {
    //check if intended
    let intended = location.state;
    if (intended) {
      navigate(intended.from);
    } else {
      //check if admin
      if (res.data.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/user/history");
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    // console.log(email, password);
    try {
      // 1 avec les identifiant je recupere le user dans firebase
      const result = await signInWithEmailAndPassword(auth, email, password);
      const { user } = result;
      const idTokenResult = await getIdTokenResult(user);

      //2 avec l'idtoken du user je recupere le reste auprès du serveur api
      createOrUpdateUser(idTokenResult.token)
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
          roleBasedRedirect(res);
        })
        .catch((e) => console.log("error", e));

      setLoading(false);
      navigate("/user/history");
    } catch (e) {
      console.log(e);
      toast.error(e.message);
      setLoading(false);
    }
  };

  const googleSubmit = () => {
    setLoading(true);
    signInWithPopup(auth, provider).then(async (res) => {
      console.log(res);
      const { user } = res;
      console.log(user);
      const idTokenResult = await user.getIdTokenResult();
      console.log(idTokenResult);
      createOrUpdateUser(idTokenResult.token)
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

      navigate("/user/history");
    });
  };

  const loginForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group mb-3">
        <label htmlFor="inputEmail1" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoFocus
          required
          placeholder="your email"
        />
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="your password"
        />
      </div>
      <br />
      <Flex gap="small" align="center" wrap="wrap">
        {!loading ? (
          <Button
            onClick={handleSubmit}
            block
            shape="round"
            icon={<MailOutlined />}
            className="mb-3 btn-light"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Login with Email/password
          </Button>
        ) : (
          <Button
            loading
            onClick={handleSubmit}
            block
            shape="round"
            icon={<MailOutlined />}
            disabled
            className="mb-3"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Login with Email/password
          </Button>
        )}
        <Button
          type="primary"
          danger
          onClick={googleSubmit}
          block
          shape="round"
          icon={<GoogleOutlined />}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Login with Google
        </Button>
      </Flex>
    </form>
  );
  return (
    <div className={`container p-5 ${loading ? "fade-in" : ""}`}>
      <div className="row" style={{ height: "100vh" }}>
        <div className="col-md-6 offset-md-3">
          {!loading ? <h4>Login</h4> : <h4>Loading ...</h4>}
          <br />
          {loginForm()}
          <Link to="/forgot/password" className="float-end text-light">
            Forgot password
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
