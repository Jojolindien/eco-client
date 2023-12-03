import React, { useState } from "react";
import {
  HomeOutlined,
  LoginOutlined,
  MailOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  const [current, setCurrent] = useState("mail");
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const logout = () => {
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
  };

  const onClick = (e) => {
    // console.log("click ", e);
    setCurrent(e.key);
  };

  const items = [
    {
      label: (
        <NavLink to="/" style={{ textDecoration: "none" }}>
          Home
        </NavLink>
      ),
      key: "home",
      icon: <HomeOutlined />,
      // className: "bg-dark text-white",
    },
    user && {
      label: "Logout",
      className: "float-end",
      onClick: logout,
      key: "logout",
      icon: <LogoutOutlined />,
      style: { marginLeft: "auto" },
    },
    !user && {
      label: (
        <Link to="/register" style={{ textDecoration: "none" }}>
          Register
        </Link>
      ),
      key: "register",
      icon: <MailOutlined />,
      className: "float-end",
    },
    !user && {
      label: (
        <Link to="/login" style={{ textDecoration: "none" }}>
          Login
        </Link>
      ),
      key: "login",
      icon: <LoginOutlined />,
      className: "float-end",
    },
    user && {
      label: user.name,
      key: "SubMenu",
      icon: <SettingOutlined />,
      className: "float-end",
      children: [
        {
          key: "setting:1",
          label: (
            <Link to="/user/history" style={{ textDecoration: "none" }}>
              Profil
            </Link>
          ),
        },
        {
          key: "setting:2",
          label: "parameters",
        },
      ],
    },
  ];
  return (
    <Menu
      className="bg-dark text-white"
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
      style={{ display: "block" }}
    />
  );
};

export default Header;
