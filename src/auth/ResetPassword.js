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
  }, [match.params.token, formData]);

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
    <main>
      <ToastContainer />
      <section>
        <h1>Reset Password</h1>
        <form onSubmit={handleSubmit}>
          <p>Password</p>
          <div>
            <input type="password" placeholder="Enter new password" onChange={handleChange("password1")} value={password1} />
          </div>
          <p>Confirm Password</p>
          <div>
            <input type="password" placeholder="Re-enter new password" onChange={handleChange("password2")} value={password2} />
          </div>
          <div>
            <button type="submit">{textChange}</button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default ResetPassword;
