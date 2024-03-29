import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import "./auth.css";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const onLogout = async (e) => {
    dispatch(logout());
  };

  return <button className="nav__logout" onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
