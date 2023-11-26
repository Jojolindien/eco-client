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
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  let dispatch = useDispatch();
  let navigate = useNavigate();
  const provider = new GoogleAuthProvider();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user && user.token) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    // console.log(email, password);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      console.log(result);
      const { user } = result;
      const idTokenResult = await getIdTokenResult(user);

      dispatch({
        type: "LOGGED_IN_USER",
        payload: {
          email: user.email,
          token: idTokenResult.token,
        },
      });
      setLoading(false);
      navigate("/");
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
      dispatch({
        type: "LOGGED_IN_USER",
        payload: {
          email: user.email,
          token: idTokenResult.token,
        },
      });

      navigate("/");
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
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          {!loading ? <h4>Login</h4> : <h4> Loading ...</h4>}
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
