import React from "react";
import { useHistory } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { setLocalStorage, isAuth } from "./helpers/auth";
import axios from "axios";

export default function Recipe({ recipe }) {
  const recipesUrl = process.env.REACT_APP_USER_URL;
  const history = useHistory();
  const servings = recipe.yield;
  const saveRecipe = (recipe, image) => {
    const { label, totalTime, servings, url, id } = recipe;

    const user = isAuth();

    axios
      .post(`${recipesUrl}/recipes`, { user, title: label, readyInMinutes: totalTime, servings, sourceUrl: url, id, image })
      .then((res) => {
        toast.success(`${res.data.recipe.title}, successfully added!`, { autoClose: 3000 });
      })
      .catch((err) => toast.error(`You have already added this recipe`));
  };

  const loginAndSave = (recipe, image) => {
    setLocalStorage("savedRecipe", recipe);
    setLocalStorage("image", image);
    history.push("/login");
  };

  return (
    <article>
      <ToastContainer />
      <h1>{recipe.label}</h1>
      <img src={recipe.image} alt="recipe" />
      <ul>
        {" "}
        <li>Preparation time: {recipe.totalTime === 0 ? "Not Provided" : `${recipe.totalTime} minutes`}</li>
        <li>Number of servings: {servings}</li>
      </ul>

      <a href={recipe.url} target="_blank" rel="noreferrer">
        Go to Recipe (Open in new tab)
      </a>
      {isAuth() && (
        <button onClick={() => saveRecipe(recipe, recipe.image)}>
          <strong style={{ fontSize: "1rem" }}>
            <em> Save Recipe</em>
          </strong>
        </button>
      )}
      {!isAuth() && (
        <button onClick={() => loginAndSave(recipe, recipe.image)}>
          {" "}
          <strong style={{ fontSize: "1rem" }}>
            <em> Login to save this recipe</em>
          </strong>
        </button>
      )}
    </article>
  );
}
