import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/navbar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
// import UsersList from "./components/UsersList";
// import User from "./components/User";
import TradePlanning from "./components/TradePlanning";
import TradeplanDetail from "./components/TradeplanDetail";
import Feed from "./components/Feed";
import { authenticate } from "./store/session";
import MarketWatch from "./components/MarketWatch";

function App() {
  const user = useSelector(state => state.session.user)
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path="/login" exact={true}>
          <LoginForm />
        </Route>
        <Route path="/sign-up" exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path="/tradeplan" exact={true} >
          <TradePlanning/>
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId" exact={true} >
          <Feed/>
        </ProtectedRoute>
        <ProtectedRoute path="/tradeplans/:planId" exact={true} >
          <TradeplanDetail/>
        </ProtectedRoute>
        <ProtectedRoute path="/" exact={true} >
          <MarketWatch/>
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
