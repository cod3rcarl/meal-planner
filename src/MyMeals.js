import React, { useState, useEffect } from "react";
import MealList from "./MealList";
import { isAuth, setLocalStorage } from "./helpers/auth";
import { useHistory, Route } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
AOS.init({
  delay: 500,
  duration: 1200,
  once: false,
});

function MyMeals() {
  const history = useHistory();
  const [meal, setMeal] = useState({});
  const [imageUrl, setImageUrl] = useState({});
  const [calories, setCalories] = useState(2000);
  const [myClass, setMyClass] = useState("container");

  useEffect(() => {
    if (isAuth()) {
      setMeal(JSON.parse(localStorage.getItem("recipe")));
      setImageUrl(JSON.parse(localStorage.getItem("image")));
    } else {
      history.push("/login");
    }
  }, []);

  const deleteRecipe = (id) => {
    console.log(id);
  };
  console.log(meal);
  return (
    <div className={myClass}>
      <div className="App" data-aos="zoom-in">
        <h1>My Meals</h1>
        <article data-aos="flip-right">
          <h1>{meal.title}</h1>
          <img src={imageUrl} alt="recipe" />

          <li>Preparation time: {meal.readyInMinutes} minutes</li>
          <li>Number of servings: {meal.servings}</li>

          <a href={meal.sourceUrl} target="_blank" rel="noreferrer">
            Go to Recipe
          </a>
          <button onClick={() => deleteRecipe(meal.id)}>Delete Recipe</button>
        </article>
      </div>
    </div>
  );
}

export default MyMeals;
