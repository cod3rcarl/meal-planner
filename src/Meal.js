import React, { useState, useEffect } from "react";
import { useHistory, Route } from "react-router-dom";
import MyMeals from "./MyMeals";
import { toast, ToastContainer } from "react-toastify";
import { setLocalStorage, isAuth } from "./helpers/auth";
import axios from "axios";

export default function Meal({ meal, ToastContainer }) {
  const history = useHistory();
  const [imageUrl, setImageUrl] = useState("");
  const apiKey = process.env.REACT_APP_API_KEY;
  useEffect(() => {
    fetch(`https://api.spoonacular.com/recipes/${meal.id}/information?apiKey=${apiKey}&includeNutrition=false`)
      .then((response) => response.json())
      .then((data) => {
        setImageUrl(data.image);
      })
      .catch(() => {
        console.log("error");
      });
  }, [meal.id, apiKey]);

  const saveRecipe = (recipe, image) => {
    const { title, readyInMinutes, servings, sourceUrl, id } = recipe;
    const user = isAuth();

    axios
      .post(`http://localhost:5000/api/v1/users/recipes`, { user, title, readyInMinutes, servings, sourceUrl, id, image })
      .then((res) => {
        toast.success(`${res.data.recipe.title}, successfully added!`, { autoClose: 3000 });
      })
      .catch((err) => toast.error(`You have already added this recipe`));
  };

  const loginAndSave = (recipe, image) => {
    setLocalStorage("recipe", recipe);
    setLocalStorage("image", image);
    history.push("/register");
  };

  return (
    <article data-aos="flip-right">
      <h1>{meal.title}</h1>
      <img src={imageUrl} alt="recipe" />

      <li>Preparation time: {meal.readyInMinutes} minutes</li>
      <li>Number of servings: {meal.servings}</li>

      <a href={meal.sourceUrl} target="_blank" rel="noreferrer">
        Go to Recipe
      </a>
      {isAuth() && <button onClick={() => saveRecipe(meal, imageUrl)}>Save Recipe</button>}
      {!isAuth() && <button onClick={() => loginAndSave(meal, imageUrl)}>Sign up to save this recipe</button>}
    </article>
  );
}
