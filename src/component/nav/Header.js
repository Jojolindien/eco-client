import React, { useState } from "react";
import {
  HomeOutlined,
  LoginOutlined,
  MailOutlined,
  SettingOutlined,
  LogoutOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Badge, Menu } from "antd";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import Search from "../form/Search";

const Header = () => {
  const [current, setCurrent] = useState("mail");
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, cart } = useSelector((state) => ({ ...state }), shallowEqual);

  const logout = () => {
    signOut(auth)
      .then(() => {
        dispatch({
          type: "LOGOUT",
          payload: null,
        });
        // navigate("/login");
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
    {
      label: (
        <NavLink to="/shop" style={{ textDecoration: "none" }}>
          Shop
        </NavLink>
      ),
      key: "shop",
      icon: <ShoppingOutlined />,
      // className: "bg-dark text-white",
    },
    {
      label: (
        <Link to="/cart" style={{ textDecoration: "none" }}>
          <Badge className="text-white" count={cart.length} offset={[15, 0]}>
            Cart
          </Badge>
        </Link>
      ),
      // onClick: logout,
      key: "cart",
      icon: <ShoppingCartOutlined />,
      style: { marginLeft: "auto" },
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
              Mon profil utilisateur
            </Link>
          ),
        },
        user &&
          user.role === "admin" && {
            key: "setting:2",
            label: (
              <Link to="/admin/dashboard" style={{ textDecoration: "none" }}>
                Mon profil administrateur
              </Link>
            ),
          },
      ],
    },
    {
      label: <Search />,
      key: "search",
      className: "float-end",
    },
  ];
  return (
    <Menu
      className="bg-black text-white outline-light"
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
      style={{ display: "block" }}
    />
  );
};

export default Header;
