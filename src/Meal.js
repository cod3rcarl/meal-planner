import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { setLocalStorage, isAuth } from "./helpers/auth";
import axios from "axios";

const recipesUrl = process.env.REACT_APP_USER_URL;
const apiKey = process.env.REACT_APP_SPOONACULAR_API_KEY;

export default function Meal({ meal }) {
  const history = useHistory();
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    fetch(`https://api.spoonacular.com/recipes/${meal.id}/information?apiKey=${apiKey}&includeNutrition=false`)
      .then((response) => response.json())
      .then((data) => {
        setImageUrl(data.image);
      })
      .catch(() => {
        console.log("error");
      });
  }, [meal.id]);

  const saveRecipe = (recipe, image) => {
    const { title, readyInMinutes, servings, sourceUrl, id } = recipe;
    const user = isAuth();

    axios
      .post(`${recipesUrl}/recipes`, { user, title, readyInMinutes, servings, sourceUrl, id, image })
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
    <article /*data-aos="flip-right"*/>
      <ToastContainer />
      <h1>{meal.title}</h1>
      <img src={imageUrl} alt="recipe" />
      <ul>
        {" "}
        <li>Preparation time: {meal.readyInMinutes} minutes</li>
        <li>Number of servings: {meal.servings}</li>
      </ul>

      <a href={meal.sourceUrl} target="_blank" rel="noreferrer">
        Go to Recipe (Open in new tab)
      </a>
      {isAuth() && <button onClick={() => saveRecipe(meal, imageUrl)}>Save Recipe</button>}
      {!isAuth() && <button onClick={() => loginAndSave(meal, imageUrl)}>Login to save this recipe</button>}
    </article>
  );
}
