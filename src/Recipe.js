import React from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
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
    setLocalStorage("recipe", recipe);
    setLocalStorage("image", image);
    history.push("/login");
  };

  return (
    <article>
      <h1>{recipe.label}</h1>
      <img src={recipe.image} alt="recipe" />
      <ul>
        {" "}
        <li>Preparation time: {recipe.totalTime === 0 ? "Not Provided" : `${recipe.totalTime} minutes`}</li>
        <li>Number of servings: {servings}</li>
      </ul>

      <a href={recipe.url} target="_blank" rel="noreferrer">
        Go to Recipe (New Tab)
      </a>
      {isAuth() && <button onClick={() => saveRecipe(recipe, recipe.image)}>Save Recipe</button>}
      {!isAuth() && <button onClick={() => loginAndSave(recipe, recipe.image)}>Login to save this recipe</button>}
    </article>
  );
}
