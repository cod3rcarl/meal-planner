import React, { useState, useEffect } from "react";
import { useHistory, Route } from "react-router-dom";
import MyMeals from "./MyMeals";
import { setLocalStorage } from "./helpers/auth";

export default function Meal({ meal }) {
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
    console.log(recipe);
    setLocalStorage("recipe", recipe);
    setLocalStorage("image", image);
    history.push("/mymeals");
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
      <button onClick={() => saveRecipe(meal, imageUrl)}>Save Recipe</button>
    </article>
  );
}
