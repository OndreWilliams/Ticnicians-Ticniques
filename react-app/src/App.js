import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch} from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/navbar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import TradePlanning from "./components/TradePlanning";
import TradeplanDetail from "./components/TradeplanDetail";
import Feed from "./components/Feed";
import { authenticate } from "./store/session";
import MarketWatch from "./components/MarketWatch";
import Footer from "./components/Footer";

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

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
          <Footer/>
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId" exact={true} >
          <Feed/>
          <Footer/>
        </ProtectedRoute>
        <ProtectedRoute path="/tradeplans/:planId" exact={true} >
          <TradeplanDetail/>
          <Footer/>
        </ProtectedRoute>
        <ProtectedRoute path="/" exact={true} >
          <MarketWatch/>
          <Footer/>
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
