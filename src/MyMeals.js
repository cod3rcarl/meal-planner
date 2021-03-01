import React, { useReducer, useEffect } from "react";
import { isAuth, signout } from "./helpers/auth";

import axios from "axios";
import { useHistory } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
AOS.init({
  delay: 500,
  duration: 1200,
  once: false,
});
const initialState = {
  loading: true,
  error: "",
  meals: [],
};
const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return {
        loading: false,
        meals: action.payload,
        error: "",
      };
    case "FETCH_ERROR":
      return {
        loading: false,
        meals: [],
        error: "Something went wrong!",
      };
    default:
      return state;
  }
};
function MyMeals() {
  const history = useHistory();
  const user = isAuth();
  const userEndpoint = process.env.REACT_APP_USER_URL;
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    axios
      .get(`${userEndpoint}/recipes/${user._id}`)
      .then((res) => {
        dispatch({ type: "FETCH_SUCCESS", payload: res.data.recipes });
      })
      .catch((err) => {
        dispatch({ type: "FETCH_ERROR" });
      });
  }, []);

  const deleteRecipe = (id) => {
    axios
      .delete(`${userEndpoint}/recipe/${id}`)
      .then(() => {
        window.location.reload();
      })
      .catch((err) => console.log("error"));
  };

  const signOut = () => {
    signout();
    history.push("/");
  };
  console.log(state.meals);
  return (
    <div className="mealContainer myMeals">
      <h1>My Recipes</h1>
      <div className="button-group" data-aos="zoom-out">
        <button className="meal-button" onClick={() => history.push("/profile")}>
          Profile
        </button>
        <button className="meal-button" onClick={signOut}>
          Sign Out
        </button>
        {state.meals && (
          <button className="meal-button" onClick={() => history.push("/")}>
            Back to recipe search
          </button>
        )}
      </div>

      <div className="mealApp" data-aos="zoom-in">
        {state.loading
          ? "Loading Recipes"
          : state.meals.map((meal) => {
              return (
                <article key={meal.recipeId}>
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
        {state.error ? state.error : null}
      </div>
      <button onClick={() => history.push("/")}>Back to recipe search</button>
    </div>
  );
}

export default MyMeals;
