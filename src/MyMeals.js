import React, { useState, useEffect } from "react";
import MealList from "./MealList";
import { isAuth, setLocalStorage, signout, authenticate } from "./helpers/auth";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
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
  const [meals, setMeals] = useState(null);
  const [results, setResults] = useState([]);
  const [imageUrl, setImageUrl] = useState({});
  const [calories, setCalories] = useState(2000);
  const [myClass, setMyClass] = useState("myMeals");

  useEffect(() => {
    const user = isAuth();

    console.log(user);
    axios
      .get(`http://localhost:5000/api/v1/users/recipes/${user._id}`)
      .then((res) => {
        setMeals(res.data.recipes);
      })
      .catch((err) => console.log("error"));
  }, []);

  const deleteRecipe = (id) => {
    axios
      .delete(`http://localhost:5000/api/v1/users/recipe/${id}`)
      .then(() => {
        console.log("deleted");
        window.location.reload();
      })
      .catch((err) => console.log("error"));
  };

  const signOut = () => {
    signout();
    history.push("/");
  };
  console.log(meals);
  return (
    <div className="mealContainer myMeals">
      <ToastContainer />
      <h1>My Recipes</h1>
      <div className="button-group">
        <button className="meal-button" onClick={() => history.push("/profile")}>
          Profile
        </button>
        <button className="meal-button" onClick={signOut}>
          Sign Out
        </button>
        {meals && (
          <button className="meal-button" onClick={() => history.push("/")}>
            Back to recipe search
          </button>
        )}
      </div>

      <div className="mealApp" data-aos="zoom-in">
        {meals &&
          meals.map((meal) => {
            return (
              <article key={meal.recipeId} data-aos="flip-right">
                <h1>{meal.title}</h1>
                <img src={meal.imageUrl} alt="recipe" />

                <li>Preparation time: {meal.prepTime} minutes</li>
                <li>Number of servings: {meal.servings}</li>

                <a href={meal.sourceUrl} target="_blank" rel="noreferrer">
                  Go to Recipe
                </a>
                <button onClick={() => deleteRecipe(meal._id)}>Delete Recipe</button>
              </article>
            );
          })}
      </div>
      <button onClick={() => history.push("/")}>Back to recipe search</button>
    </div>
  );
}

export default MyMeals;
