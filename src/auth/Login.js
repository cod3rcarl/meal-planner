import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import axios from "axios";
import { authenticate } from "../helpers/auth";
import { useHistory } from "react-router-dom";
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

        toast.success(`Hey ${response.data.user.name}, Welcome back!`, { autoClose: 2000 });
        setTimeout(() => {
          localStorage.getItem("recipe") ? history.push("/login/saverecipe") : history.push("/mymeals");
        }, 2000);
      })
      .catch((error) => {
        toast.error("Google SignIn error! Please try again", { autoClose: 2000 });
        console.log(error);
      });
  };

  /*------------------------------EMAIL LOGIN--------------------------------*/

  const [loginFormData, setLoginFormData] = useState({ loginEmail: "", loginPassword1: "", loginTextChange: "Submit" });
  const { loginEmail, loginPassword1, loginTextChange } = loginFormData;
  const handleLoginChange = (text) => (e) => {
    setLoginFormData({ ...loginFormData, [text]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (loginEmail && loginPassword1) {
      setLoginFormData({ ...loginFormData, textChange: "Submitting" });
      axios
        .post(`${process.env.REACT_APP_API_URL}/login`, {
          email: loginEmail,
          password: loginPassword1,
        })
        .then((response) => {
          toast.success(`Hey ${response.data.user.name}, Welcome back!`, { autoClose: 3000 });
          setTimeout(() => {
            authenticate(response);
            setLoginFormData({ ...loginFormData, loginEmail: "", loginPassword1: "", textChange: "Submitted" });

            localStorage.getItem("recipe") ? history.push("/login/saverecipe") : history.push("/mymeals");
          }, 3000);
        })
        .catch((err) => {
          console.log(err);
          setLoginFormData({ ...loginFormData, email: "", password1: "", textChange: "Sign In" });
          toast.error("Error logging in", { autoClose: 3000 });
        });
    } else {
      toast.error("Please fill in all fields", { autoClose: 3000 });
    }
  };

  return (
    <main>
      <ToastContainer />
      <section /*data-aos="zoom-in"*/>
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <p>Email</p>
          <div>
            <input type="email" placeholder="Enter email address" autoComplete="off" onChange={handleLoginChange("loginEmail")} value={loginEmail} />
          </div>
          <p>Password</p>
          <div>
            <input style={{ marginBottom: "1rem" }} type="password" placeholder="Enter password" autoComplete="off" onChange={handleLoginChange("loginPassword1")} value={loginPassword1} />
          </div>

          <div>
            <button type="submit">{loginTextChange}</button>
          </div>

          <GoogleLogin
            clientId={`${process.env.REACT_APP_GOOGLE_CLIENT}`}
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={"single_host_origin"}
            render={(renderProps) => (
              <button onClick={renderProps.onClick} disabled={renderProps.disabled}>
                <i className="fab fa-google " />
                Or Sign In with Google <span> </span>
              </button>
            )}
          ></GoogleLogin>
        </form>
        <div>
          {" "}
          <h3 onClick={() => history.push("/users/password/forget")}>Forgot Password</h3>
          <h3 onClick={() => history.push("/register")}>Register</h3>
        </div>

        <button onClick={() => history.push("/")}>Back to home page</button>
      </section>
    </main>
  );
}

export default Login;
