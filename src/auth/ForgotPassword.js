import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import { isAuth } from "../helpers/auth";

import { useHistory, Redirect } from "react-router-dom";
import axios from "axios";

const ForgetPassword = () => {
  const history = useHistory();
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
    <main>
      {isAuth() ? <Redirect to="/" /> : null}
      <ToastContainer />
      <section data-aos="zoom-in">
        <h1>Forgot Password</h1>
        <form onSubmit={handleSubmit} className="sign-up-form">
          <p>Email</p>
          <div className="input-field">
            <input type="email" placeholder="Enter email" onChange={handleChange("email")} value={email} />
          </div>

          <div>
            <button type="submit">{textChange}</button>
          </div>
        </form>
        <div>
          {" "}
          <h3 onClick={() => history.push("/login")}>Back to login</h3>
          <h3 onClick={() => history.push("/register")}>Register</h3>
        </div>
        <button onClick={() => history.push("/")}>Back to home page</button>
      </section>
    </main>
  );
};

export default ForgetPassword;
