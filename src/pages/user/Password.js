import React, { useState } from "react";
import UserNav from "../../component/nav/UserNav";
import { Button } from "antd";
import { auth } from "../../firebase";
import { updatePassword } from "firebase/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Container = styled.div`
  animation: ${fadeIn} 1s ease-in-out;
`;

const Password = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!password) {
      toast.error("Please provide your email & password for confirmation");
      setLoading(false);
      return;
    }
    if (password && password.length < 6) {
      toast.error("Password must be at least 6 caractere long");
      setLoading(false);
      return;
    }
    try {
      const user = auth.currentUser;
      await updatePassword(user, password);
      setLoading(false);
      toast.success("Password updated !");
      navigate("/user/history");
    } catch (error) {
      console.error("Error updating password:", error.message);
      toast.error(error.message);
      setLoading(false);
      // Handle the error, for example, show an error message to the user
    }
  };

  const passwordUpdateForm = () => {
    return (
      <Container className="container col-md-6 offset-md-3 p-5">
        {loading ? <h4>Loading ... </h4> : <h4>Reset new password</h4>}
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="type your new password"
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
            disabled={!password}
            loading={loading}
          >
            Create new password
          </Button>
        </form>
      </Container>
    );
  };

  return (
    <div className="container-fluid">
      <div className="row my-5">
        <div className="col-md-2">
          <UserNav />
        </div>
        <div className="col">{passwordUpdateForm()}</div>
      </div>
    </div>
  );
};

export default Password;
