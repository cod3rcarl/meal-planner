import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import App from "./App";

import ForgotPassword from "./ForgotPassword";
import ResetPassword from "./ResetPassword";
import Profile from "./Profile";
import Login from "./Login";
import SignUp from "./SignUp";
import MyMeals from "./MyMeals";
import { SaveRecipe } from "./SaveRecipe";

import "react-toastify/dist/ReactToastify.css";
import "./index.css";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/mymeals" exact component={MyMeals} />
      <Route path="/profile" exact component={Profile} />
      <Route path="/login/saverecipe" exact component={SaveRecipe} />
      <Route path="/users/password/forget" component={ForgotPassword} />
      <Route path="/users/password/reset/:token" component={ResetPassword} />

      <Route path="/login">
        <Login />
      </Route>
      <Route path="/register">
        <SignUp />
      </Route>
      <Route path="/" exact component={App} />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
