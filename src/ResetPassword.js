import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const ResetPassword = ({ match }) => {
  const history = useHistory();
  const [formData, setFormData] = useState({ password1: "", password2: "", token: "", textChange: "Submit" });
  const { password1, password2, textChange, token } = formData;

  useEffect(() => {
    const token = match.params.token;
    if (token) {
      setFormData({ ...formData, token });
    }
  }, []);

  const handleChange = (text) => (e) => {
    setFormData({ ...formData, [text]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password1 === password2 && password1 && password2) {
      setFormData({ ...formData, textChange: "Submitting" });
      axios
        .put(`${process.env.REACT_APP_API_URL}/resetpassword/${token}`, { newPassword: password1, resetPasswordLink: token })
        .then((res) => {
          setFormData({ ...formData, password1: "", password2: "" });
          toast.success(res.data.message, { autoClose: 3000 });
          setTimeout(() => {
            history.push("/profile");
          }, 3000);
        })
        .catch((err) => {
          toast.error(`Something is wrong try again ${err}`, { autoClose: 3000 });
        });
    } else {
      toast.error("Passwords do not match", { autoClose: 3000 });
    }
  };
  return (
    <div className="container sign-up-mode">
      <ToastContainer />
      <div className="forms-container">
        <div className="signin-signup">
          <form onSubmit={handleSubmit} className="sign-up-form" style={{ marginTop: "65px" }}>
            <h2 className="title">Reset Password</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input type="password" placeholder="Password" onChange={handleChange("password1")} value={password1} />
            </div>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input type="password" placeholder="Confirm Password" onChange={handleChange("password2")} value={password2} />
            </div>
            <input type="submit" className="btn solid" value={textChange} />
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
