import cookie from "js-cookie";

export const setCookie = (key, value) => {
  if (window !== "undefined") {
    //Set cookie, expires in 1 day
    cookie.set(key, value, {
      expires: 1,
    });
  }
};

export const removeCookie = (key) => {
  if (window !== "undefined") {
    //Set cookie, expires in 1 day
    cookie.remove(key, {
      expires: 1,
    });
  }
};

export const getCookie = (key) => {
  if (window !== "undefined") {
    //Set cookie, expires in 1 day
    return cookie.get(key);
  }
};

export const setLocalStorage = (key, value) => {
  if (window !== "undefined") {
    //Set cookie, expires in 1 day
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export const removeLocalStorage = (key) => {
  if (window !== "undefined") {
    //Set cookie, expires in 1 day
    localStorage.removeItem(key);
  }
};

export const authenticate = (response) => {
  console.log(response);
  setCookie("token", response.data.token);
  setLocalStorage("user", response.data.user);
};

export const signout = () => {
  removeCookie("token");
  removeLocalStorage("user");
  removeLocalStorage("recipe");
  removeLocalStorage("image");
};

export const isAuth = () => {
  if (window !== "undefined") {
    const cookieCheck = getCookie("token");
    if (cookieCheck) {
      if (localStorage.getItem("user")) {
        return JSON.parse(localStorage.getItem("user"));
      } else {
        return false;
      }
    }
  }
};

export const updateUser = (response, next) => {
  if (window !== "undefined") {
    let auth = JSON.parse(localStorage.getItem("user"));
    auth = response.data;
    localStorage.setItem("user", JSON.stringify(auth));
  }
  next();
};
