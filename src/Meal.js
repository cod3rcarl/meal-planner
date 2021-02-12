import React, { useState, useEffect } from "react";

export default function Meal({ meal }) {
  const [imageUrl, setImageUrl] = useState("");
  const apiKey = process.env.REACT_APP_API_KEY;
  useEffect(() => {
    fetch(
      `https://api.spoonacular.com/recipes/${meal.id}/information?apiKey=${apiKey}&includeNutrition=false`
    )
      .then((response) => response.json())
      .then((data) => {
        setImageUrl(data.image);
      })
      .catch(() => {
        console.log("error");
      });
  }, [meal.id, apiKey]);

  return (
    <article>
      <h1>{meal.title}</h1>
      <img src={imageUrl} alt="recipe" />

      <li>Preparation time: {meal.readyInMinutes} minutes</li>
      <li>Number of servings: {meal.servings}</li>

      <a href={meal.sourceUrl}>Go to Recipe</a>
    </article>
  );
}
