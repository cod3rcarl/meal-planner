import React, { useRef } from "react";
import { useHistory } from "react-router-dom";
import { isAuth, signout } from "../helpers/auth";
import { useDetectOutsideClick } from "./useDetectOutsideClick";
import "./dropdown.css";

export default function App() {
  const path = window.location.pathname;
  const history = useHistory();
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const handleDropdown = () => setIsActive(!isActive);
  const signOut = () => {
    signout();
    history.push("/");
  };
  return (
    <div className="container">
      <div className="menu-container">
        <div onClick={handleDropdown}>
          {" "}
          <i className="fas fa-chevron-circle-down"></i>
          <span>Menu</span>
        </div>

        <nav ref={dropdownRef} className={`menu ${isActive ? "active" : "inactive"}`}>
          <ul>
            <li className={path === "/login" && "current"}>{isAuth() ? <p onClick={signOut}>Signout</p> : <p onClick={() => history.push("/login")}>Login</p>}</li>
            <li className={path === "/mymeals" && "current"}>{isAuth() && <p onClick={() => history.push("/mymeals")}>View My Recipes</p>}</li>
            <li className={path === "/" && "current"}>
              {" "}
              <p onClick={() => history.push("/")}>Recipe Search</p>
            </li>
            <li className={path === "/profile" && "current"}> {isAuth() ? <p onClick={() => history.push("/profile")}>Profile</p> : <p onClick={() => history.push("/register")}>Sign Up</p>}</li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
