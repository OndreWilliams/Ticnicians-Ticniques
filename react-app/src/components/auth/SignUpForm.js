import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import { Redirect } from 'react-router-dom';
import { signUp, login } from '../../store/session';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    const tempErrors = [];
    if (username.length < 3)
      tempErrors.push("Enter a username of at least 3 characters")
    if (email.length < 6 || !email.includes("@"))
      tempErrors.push("Enter a valid email address")
    if (password.length < 5)
      tempErrors.push("Enter a password of at least 5 characters")
    if (password !== repeatPassword)
      tempErrors.push("Passwords must match")

    if (tempErrors.length < 1) {
      const data = await dispatch(signUp(username, email, password));
      if (data.errors) {
        setErrors(data.errors);
      }
    }
    else {
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

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div className="formPage">
      <form className="authForm signupForm form" onSubmit={onSignUp}>
        <div className="form__header">Sign up</div>
        <div className="form__errors-cntnr tradeplanning__errors">
          {errors.map((error) => (
            <div className="error">{error}</div>
          ))}
        </div>
        <div className="formField">
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={updateUsername}
            value={username}
          ></input>
        </div>
        <div className="formField">
          <input
            type="text"
            name="email"
            placeholder="Email"
            onChange={updateEmail}
            value={email}
          ></input>
        </div>
        <div className="formField">
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={updatePassword}
            value={password}
          ></input>
        </div>
        <div className="formField">
          <input
            type="password"
            name="repeat_password"
            placeholder="Confirm Password"
            onChange={updateRepeatPassword}
            value={repeatPassword}
          ></input>
        </div>
        <div className="authForm__buttons-cntnr">
          <button className="formButton" type="submit">Sign Up</button>
          <button onClick={onDemoLogin} className="formButton" >Demo</button>
        </div>
      </form>
    </div>

  );
};

export default SignUpForm;
