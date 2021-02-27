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

function Login() {
  const history = useHistory();
  const [myClass, setMyClass] = useState("container");

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
          console.log("Signed In");
          // history.push("/profile");
        }, 3000);
      })
      .catch((error) => {
        toast.error("Google SignIn error! Please try again", { autoClose: 3000 });
        console.log(error);
      });
  };

  /*------------------------------EMAIL LOGIN--------------------------------*/

  const [loginFormData, setLoginFormData] = useState({ loginEmail: "", loginPassword1: "", loginTextChange: "Sign In" });
  const { loginEmail, loginPassword1, loginTextChange } = loginFormData;
  const handleLoginChange = (text) => (e) => {
    setLoginFormData({ ...loginFormData, [text]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("submit");
    // if (loginEmail && loginPassword1) {
    //   setLoginFormData({ ...loginFormData, textChange: "Submitting" });
    //   axios
    //     .post(`${process.env.REACT_APP_API_URL}/login`, {
    //       email: loginEmail,
    //       password: loginPassword1,
    //     })
    //     .then((response) => {
    //       toast.success(`Hey ${response.data.user.name}, Welcome back!`, { autoClose: 3000 });
    //       setTimeout(() => {
    //         authenticate(response);
    //         setLoginFormData({ ...loginFormData, loginEmail: "", loginPassword1: "", textChange: "Submitted" });
    //         console.log(isAuth());
    //         history.push("/profile");
    //       }, 3000);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //       setLoginFormData({ ...loginFormData, email: "", password1: "", textChange: "Sign In" });
    //       toast.error("Error logging in", { autoClose: 3000 });
    //     });
    // } else {
    //   toast.error("Please fill in all fields", { autoClose: 3000 });
    // }
  };

  return (
    <div className={myClass}>
      <ToastContainer />
      <div className="App" data-aos="zoom-in">
        <h1>My Meal Plan</h1>
        <form onSubmit={handleLogin} className="controls">
          <div className="input-field">
            <i className="fas fa-user"></i>
            <input type="email" placeholder="Email" autoComplete="off" onChange={handleLoginChange("loginEmail")} value={loginEmail} />
          </div>
          <div className="input-field">
            <i className="fas fa-lock"></i>
            <input type="password" placeholder="Password" autoComplete="off" onChange={handleLoginChange("loginPassword1")} value={loginPassword1} />
          </div>
          <input type="submit" className="btn solid" value={loginTextChange} />
          <p className="social-text">Or Sign In with Google</p>
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
                </button>
              )}
            ></GoogleLogin>
          </div>
          <br />
          <Link to="/users/password/forget">
            <p>Forgot Password?</p>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
