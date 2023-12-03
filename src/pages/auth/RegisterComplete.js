import { useEffect, useState } from "react";
import { auth } from "../../firebase";
// import { toast } from "react-toastify";

import {
  getIdTokenResult,
  signInWithEmailLink,
  updatePassword,
} from "firebase/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createOrUpdateUser } from "../../functions/auth";

const RegisterComplete = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    setEmail(window.localStorage.getItem("emailForRegistration"));
    // console.log(
    //   window.localStorage.getItem("emailForRegistration"),
    //   window.location.href
    // );
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email || !password) {
      toast.error("Please provide your email & password for confirmation");
      return;
    }
    if (password && password.length < 6) {
      toast.error("Password must be at least 6 caractere long");
      return;
    }
    try {
      // LOGIN WHEN VALIDATING THE MAIL CONFIRMATION
      const result = await signInWithEmailLink(
        auth,
        email,
        window.location.href
      );
      console.log(result);

      //UPDATE THE PASSWORD
      if (result.user.emailVerified) {
        // remove user email from local storage
        window.localStorage.removeItem("emailForRegistration");
        // get user id token
        const user = auth.currentUser;
        await updatePassword(user, password);
        const idTokenResult = await getIdTokenResult(user);
        // redux store
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
        // redirect;
        navigate("/");
      }
    } catch (e) {
      console.log(e);
      toast.error(`Error ${e.message}`);
    }
  };

  const completeRegisterForm = () => (
    <form onSubmit={handleSubmit}>
      <input type="email" className="form-control" value={email} disabled />
      <input
        type="password"
        className="form-control"
        value={password}
        autoFocus
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit" className="btn btn-secondary">
        Validate accompte
      </button>
    </form>
  );
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Finishing registration</h4>
          {completeRegisterForm()}
        </div>
      </div>
    </div>
  );
};

export default RegisterComplete;
