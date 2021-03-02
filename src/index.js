import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import App from "./App";
import "normalize.css";

import ForgotPassword from "./auth/ForgotPassword";
import ResetPassword from "./auth/ResetPassword";
import Profile from "./profile/Profile";
import Login from "./auth/Login";
import SignUp from "./auth/SignUp";
import MyMeals from "./profile/MyMeals";
import { SaveRecipe } from "./auth/SaveRecipe";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/mymeals" component={MyMeals} />
      <Route path="/profile" component={Profile} />
      <Route path="/login/saverecipe" exact component={SaveRecipe} />
      <Route path="/login" exact component={Login} />
      <Route path="/users/password/forget" exact component={ForgotPassword} />
      <Route path="/users/password/reset/:token" exact component={ResetPassword} />
      <Route path="/register" exact component={SignUp} />
      <Route path="/" exact component={App} />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
