import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { isAuth } from "./helpers/auth";

import { Link, Redirect } from "react-router-dom";
import axios from "axios";

const ForgetPassword = () => {
  const [formData, setFormData] = useState({ email: "", textChange: "Submit" });
  const { email, textChange } = formData;

  const handleChange = (text) => (e) => {
    setFormData({ ...formData, [text]: e.target.value });
  };

  const handleSubmit = (e) => {
    console.log(email);
    e.preventDefault();
    if (email) {
      setFormData({ ...formData, textChange: "Submitting" });
      axios
        .post(`${process.env.REACT_APP_API_URL}/forgotpassword`, { email })
        .then((res) => {
          toast.success(`Please check your email`, { autoClose: 3000 });
          setFormData({ ...formData, email: "" });
        })
        .catch((err) => {
          toast.error(err.response.data.error, { autoClose: 3000 });
        });
    } else {
      toast.error("Please fill all fields", { autoClose: 3000 });
    }
  };
  return (
    <div className="container">
      {isAuth() ? <Redirect to="/" /> : null}
      <ToastContainer />
      <div className="App" data-aos="zoom-in">
        <h1>Forgot Password</h1>
        <form onSubmit={handleSubmit} className="sign-up-form">
          <div className="input-field">
            <i className="fas fa-user"></i>
            <input type="email" placeholder="Email" onChange={handleChange("email")} value={email} />
          </div>

          <input type="submit" className="btn solid" value={textChange} />
        </form>
        <Link to="/">
          <p>Return to home page</p>
        </Link>
      </div>
    </div>
  );
};

export default ForgetPassword;
