import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import LogoutButton from '../auth/LogoutButton';
import "./NavBar.css";
import chart from "./chart.png"
//
const NavBar = () => {
  const user = useSelector(state => state.session.user);

  return (
    <nav className="nav">
      <ul className="nav__ul">
        <li className="nav__li home__li">
          <NavLink to="/" exact={true} className="nav__home" activeClassName="active">
            <img src={chart} alt="logo" className="home" />
          </NavLink>
        </li>
        <li className="nav__li trade-planning__li">
          <NavLink to="/tradeplan" exact={true} className="nav__link nav__tradeplanning" activeClassName="active">
            Create a Tradeplan
          </NavLink>
        </li>
        <li className="nav__li feed__li">
          <NavLink to="/users/:userId" exact={true} className="nav__link nav__feed" activeClassName="active">
            Trade Book
          </NavLink>
        </li>
        {!user && [user].map((user) => {
          return(
            <li className="nav__li nav__auth">
              <NavLink to="/login" exact={true} className="nav__link" activeClassName="active">
                Login
              </NavLink>
            </li>
          )
        })}
        {!user && [user].map((user) => {
          return(
            <li className="nav__li nav__auth">
              <NavLink to="/sign-up" exact={true} className="nav__link" activeClassName="active">
                Sign Up
              </NavLink>
            </li>
          )
        })}
        {user && [user].map((user) => {
          return(
            <li className="nav__welcome">
              Welcome back, {user.username}
            </li>
          )
        })}
        {user && [user].map((user) => {
          return(
            <li className="nav__li nav__logoutButton">
              <LogoutButton />
            </li>
          )
        })}
      </ul>
    </nav>
  );
}

export default NavBar;
