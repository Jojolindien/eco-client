import { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { MailOutlined } from "@ant-design/icons";
import { sendSignInLinkToEmail } from "firebase/auth";
import { Button } from "antd";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");

  //Verif si deja connecté
  const user = useSelector((state) => state.user);
  let navigate = useNavigate();

  useEffect(() => {
    if (user && user.token) {
      navigate("/");
    }
  }, [user, navigate]);

  //action du click
  const handleSubmit = async (event) => {
    event.preventDefault();

    const actionCodeSettings = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    };

    try {
      // console.log(process.env.REACT_APP_REGISTER_REDIRECT_URL);
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      toast.success(
        `Email is sent to ${email}, Click the link in the email to complete your registration`,
        { theme: "dark" }
      );
    } catch (e) {
      console.error(e);
      toast.error(`Error ${e}`);
    }

    window.localStorage.setItem("emailForRegistration", email);

    setEmail("");
  };

  const registerForm = () => (
    <form onSubmit={handleSubmit}>
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
      <br />
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
        Submit
      </Button>
    </form>
  );
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Register</h4>
          <br />
          {registerForm()}
        </div>
      </div>
    </div>
  );
};

export default Register;
