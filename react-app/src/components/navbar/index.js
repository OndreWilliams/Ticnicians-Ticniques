import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import "./NavBar.css";
import chart from "./chart.png"
//
const NavBar = () => {
  return (
    <nav className="nav">
      <ul className="nav__ul">
        <li className="nav__li home__li">
          <NavLink to="/" exact={true} className="nav__link nav__home" activeClassName="active">
            <img src={chart} alt="logo" className="home" />
          </NavLink>
        </li>
        <li className="nav__li feed__li">
          <NavLink to="/users/:userId" exact={true} className="nav__link nav__feed" activeClassName="active">
            Feed
          </NavLink>
        </li>
        <li className="nav__li nav__login">
          <NavLink to="/login" exact={true} className="nav__link" activeClassName="active">
            Login
          </NavLink>
        </li>
        <li className="nav__li nav__signup">
          <NavLink to="/sign-up" exact={true} className="nav__link" activeClassName="active">
            Sign Up
          </NavLink>
        </li>
        <li className="nav__li nav__users">
          <NavLink to="/users" exact={true} className="nav__link" activeClassName="active">
            Users
          </NavLink>
        </li>
        <li className="nav__li nav__logout">
          <LogoutButton />
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
