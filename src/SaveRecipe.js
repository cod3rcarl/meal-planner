import React, { useEffect } from "react";
import { isAuth, setLocalStorage, signout, authenticate } from "./helpers/auth";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useHistory, Route } from "react-router-dom";

export const SaveRecipe = () => {
  const history = useHistory();
  useEffect(() => {
    const savedRecipe = JSON.parse(localStorage.getItem("recipe"));
    const savedImage = JSON.parse(localStorage.getItem("image"));

    const saveRecipe = (recipe, image) => {
      if (localStorage.getItem("recipe")) {
        const { title, readyInMinutes, servings, sourceUrl, id } = recipe;
        const user = isAuth();

        axios
          .post(`http://localhost:5000/api/v1/users/recipes`, { user, title, readyInMinutes, servings, sourceUrl, id, image })
          .then((res) => toast.success(`${res.data.recipe.title}, successfully added!`, { autoClose: 3000 }))
          .catch((err) => toast.error(err.message));
      }
    };
    saveRecipe(savedRecipe, savedImage);
    localStorage.removeItem("recipe");
    localStorage.removeItem("image");
  }, []);
  return <div> {setTimeout(() => history.push("/mymeals"), 100)}</div>;
};
