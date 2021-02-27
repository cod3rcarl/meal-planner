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
    <div className="container sign-up-mode">
      {isAuth() ? <Redirect to="/" /> : null}
      <ToastContainer />
      <div className="forms-container">
        <div className="signin-signup">
          <form onSubmit={handleSubmit} className="sign-up-form" style={{ marginTop: "65px" }}>
            <h2 className="title">Forgot Password</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input type="email" placeholder="Email" onChange={handleChange("email")} value={email} />
            </div>
            <input type="submit" className="btn solid" value={textChange} />
          </form>
        </div>
      </div>
      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>New here ?</h3>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis, ex ratione. Aliquid!</p>
            <Link to="/login">
              {" "}
              <button className="btn transparent" id="sign-in-btn">
                Sign in
              </button>
            </Link>
          </div>
          <img src="https://img2.pngio.com/health-and-fitness-png-picture-624325-health-and-fitness-png-health-and-fitness-png-1023_772.png" alt="Health and fitness png" className="image" />
        </div>
        <div className="panel right-panel">
          <div className="content" style={{ marginBottom: "65px" }}>
            <p style={{ fontSize: "1.5rem" }}>Remembered?</p>
            <h4>Sign in to your account</h4>
            <br />
            <Link to="/login">
              {" "}
              <button className="btn transparent" id="sign-in-btn">
                Sign in
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
