import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { authenticate, isAuth } from "./helpers/auth";
import { Link, useHistory } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
AOS.init({
  delay: 500,
  duration: 1200,
  once: false,
});

function SignUp() {
  const history = useHistory();
  const [signUpFormData, setSignUpFormData] = useState({ name: "", email: "", password1: "", password2: "", textChange: "Sign Up" });
  const { name, email, password1, password2, textChange } = signUpFormData;
  const handleSignUpChange = (text) => (e) => {
    setSignUpFormData({ ...signUpFormData, [text]: e.target.value });
  };
  const handleSignUp = (e) => {
    e.preventDefault();
    if (name && email && password1) {
      if (password1 === password2) {
        setSignUpFormData({ ...signUpFormData, textChange: "Submitting" });
        axios
          .post(`${process.env.REACT_APP_API_URL}/register`, { name, email, password: password1 })
          .then((res) => {
            setSignUpFormData({ ...signUpFormData, name: "", email: "", password1: "", password2: "", textChange: "Submitted" });
            toast.success(res.data.message, { autoClose: 3000 });
            setTimeout(() => {
              authenticate(res);
              localStorage.getItem("recipe") ? history.push("/login/saverecipe") : history.push("/mymeals");
            }, 3000);
          })
          .catch((err) => {
            setSignUpFormData({ ...signUpFormData, name: "", email: "", password1: "", password2: "", textChange: "Sign Up" });
            toast.error(err.response.data.errors);
          });
      } else {
        toast.error("Passwords do not match");
      }
    } else {
      toast.error("Please fill all fields");
    }
  };
  /*------------------------------GOOGLE LOGIN--------------------------------*/

  const responseGoogle = (response) => {
    sendGoogleToken(response.tokenId);
  };

  const sendGoogleToken = (tokenId) => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/googlelogin`, {
        idToken: tokenId,
      })
      .then((response) => {
        authenticate(response);
        toast.success(`Hey ${response.data.user.name}, Welcome back!`, { autoClose: 3000 });
        setTimeout(() => {
          localStorage.getItem("recipe") ? history.push("/login/saverecipe") : history.push("/mymeals");
        }, 3000);
      })
      .catch((error) => {
        toast.error("Google SignIn error! Please try again", { autoClose: 3000 });
        console.log(error);
      });
  };
  return (
    <div className="container">
      <ToastContainer />
      <div className="App" data-aos="zoom-in">
        <h1>My Meal Plan</h1>
        {/* REGISTER */}

        <form className="sign-up-form" onSubmit={handleSignUp}>
          <h2 className="title">Sign Up</h2>

          <div className="input-field">
            <i className="fas fa-user"></i>
            <input type="text" placeholder="Name" autoComplete="off" onChange={handleSignUpChange("name")} value={name} />
          </div>
          <div className="input-field">
            <i className="fas fa-envelope"></i>
            <input type="email" placeholder="Email" autoComplete="off" onChange={handleSignUpChange("email")} value={email} />
          </div>
          <div className="input-field">
            <i className="fas fa-lock"></i>
            <input type="password" placeholder="Password" autoComplete="off" onChange={handleSignUpChange("password1")} value={password1} />
          </div>
          <div className="input-field">
            <i className="fas fa-lock"></i>
            <input type="password" placeholder="Confirm Password" autoComplete="off" onChange={handleSignUpChange("password2")} value={password2} />
          </div>
          <input type="submit" className="btn" value={textChange} />
          <p className="social-text">Or Sign in with Google</p>
          <div className="social-media">
            {" "}
            <GoogleLogin
              clientId={`${process.env.REACT_APP_GOOGLE_CLIENT}`}
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={"single_host_origin"}
              render={(renderProps) => (
                <button onClick={renderProps.onClick} disabled={renderProps.disabled} className="social-icon">
                  <i className="fab fa-google " />

                  {/* <span className="ml-4">Sign In with Google</span> */}
                </button>
              )}
            ></GoogleLogin>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
