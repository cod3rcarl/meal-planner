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

function SignUp() {
  const history = useHistory();
  const [signUpFormData, setSignUpFormData] = useState({ name: "", email: "", password1: "", password2: "", textChange: "Submit" });
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
            setSignUpFormData({ ...signUpFormData, name: "", email: "", password1: "", password2: "", textChange: "Submit" });
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
    <main>
      <ToastContainer />
      <section /*data-aos="zoom-in"*/>
        <h1>Register</h1>
        {/* REGISTER */}

        <form onSubmit={handleSignUp}>
          <p>Name</p>
          <div>
            <input type="text" placeholder="Enter name" autoComplete="off" onChange={handleSignUpChange("name")} value={name} />
          </div>
          <p>Email</p>
          <div>
            <input type="email" placeholder="Email" autoComplete="off" onChange={handleSignUpChange("email")} value={email} />
          </div>
          <p>Password</p>
          <div>
            <input type="password" placeholder="Enter password" autoComplete="off" onChange={handleSignUpChange("password1")} value={password1} />
          </div>
          <p>Confirm Password</p>
          <div>
            <input type="password" placeholder="Re-enter password" autoComplete="off" onChange={handleSignUpChange("password2")} value={password2} />
          </div>
          <div>
            <button type="submit">{textChange}</button>
          </div>
          <p>Already got an account?</p>
          <button onClick={() => history.push("/login")}>Login</button>

          <GoogleLogin
            clientId={`${process.env.REACT_APP_GOOGLE_CLIENT}`}
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={"single_host_origin"}
            render={(renderProps) => (
              <button onClick={renderProps.onClick} disabled={renderProps.disabled}>
                <i className="fab fa-google " />
                Or Sign In with Google
              </button>
            )}
          ></GoogleLogin>
        </form>
        <button onClick={() => history.push("/")}>Back to home page</button>
      </section>
    </main>
  );
}

export default SignUp;
