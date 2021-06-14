import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../store/session";
import "./auth.css";

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const tempErrors = [];
    if (email.length < 6 || !email.includes("@"))
      tempErrors.push("Enter a valid email address")
    if (password.length < 5)
      tempErrors.push("Passwords must be at least 5 characters")
    if (tempErrors.length < 1) {
      const data = await dispatch(login(email, password));
      if (data.errors) {
        setErrors(data.errors);
      }
    } else {
      setErrors(tempErrors);
    }
  };

  const onDemoLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login("demo@aa.io", "password"));
    if (data.errors) {
      setErrors(data.errors);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div  className="formPage">
      <form onSubmit={onLogin} className="authForm loginForm form">
        <div className="form__header">Login</div>
        <div className="form__errors-cntnr">
          {errors.map((error) => (
            <div className="error">{error}</div>
          ))}
        </div>
        <div className="formField">
          <label className="formLabel" htmlFor="email"></label>
          <input
            name="email"
            type="text"
            placeholder="Email"
            value={email}
            onChange={updateEmail}
          />
        </div>
        <div className="formField">
          <label className="formLabel" htmlFor="password"></label>
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={updatePassword}
          />

        </div>
        <div className="authForm__buttons-cntnr">
          <button className="formButton" type="submit">Login</button>
          <button onClick={onDemoLogin} className="formButton" >Demo</button>
        </div>

      </form>
    </div>

  );
};

export default LoginForm;
