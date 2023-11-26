import { sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from "../../firebase";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.token) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const actionCodeSettings = {
      url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT,
      handleCodeInApp: true,
    };
    sendPasswordResetEmail(auth, email, actionCodeSettings)
      .then(() => {
        console.log("email sent to reset password");
        setEmail("");
        toast.success("Email sent");
        setLoading(false);
      })
      .catch((error) => {
        const errorCode = error.code;
        toast.error(errorCode);
        console.log(error);
        // const errorMessage = error.message;
        // toast.error(errorMessage);
        setLoading(false);
      });
  };

  return (
    <div className="container col-md-6 offset-md-3 p-5">
      {loading ? <h4>Loading ... </h4> : <h4>Forgot password</h4>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="type your email"
          autoFocus
          required
        />
        <br />
        <Button
          onClick={handleSubmit}
          block
          shape="round"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          disabled={!email}
          loading={loading}
        >
          Create new password
        </Button>
      </form>
    </div>
  );
};

export default ForgotPassword;
