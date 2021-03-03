import React, { useReducer, useEffect, useState } from "react";
import { isAuth, signout } from "../helpers/auth";
import DropdownMenu from "../components/Dropdown";
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
    case "SEARCH_SUCCESS":
      return {
        loading: false,
        search: action.result,
        error: "",
      };
    case "SEARCH_FAIL":
      return {
        loading: false,
        search: [],
        error: "Something went wrong",
      };
    default:
      return state;
  }
};
function MyMeals() {
  const history = useHistory();
  const user = isAuth();
  const userEndpoint = process.env.REACT_APP_USER_URL;
  const [search, setSearch] = useState("");
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
  }, [user._id, userEndpoint]);

  const handleSearch = (e) => {
    e.preventDefault();
    try {
      const result = state.meals.filter((recipe) => recipe.title.toUpperCase().includes(search.toUpperCase()));
      dispatch({ type: "SEARCH_SUCCESS", result: result });
    } catch (error) {
      dispatch({ type: "SEARCH_FAIL" });
    }
  };
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

  return (
    <main>
      <h1>My Recipes</h1>
      <DropdownMenu />

      {state.meals ? (
        <form className="search" onSubmit={handleSearch}>
          <input type="text" placeholder="Search your recipes" autoComplete="off" onChange={(e) => setSearch(e.target.value)} />

          <button type="submit">Search</button>
        </form>
      ) : (
        <section> {state.search && <button onClick={() => window.location.reload()}> Show All Recipes</button>}</section>
      )}

      <section className="mealApp" data-aos="zoom-in">
        {state.search
          ? state.search.map((meal) => {
              return (
                <article key={meal.recipeId}>
                  <h1>{meal.title}</h1>
                  <img src={meal.imageUrl} alt="recipe" />

                  <li>Preparation time: {meal.prepTime} minutes</li>
                  <li>Number of servings: {meal.servings}</li>
                  <section className="button-group">
                    {" "}
                    <a href={meal.sourceUrl} target="_blank" rel="noreferrer">
                      Go to Recipe
                    </a>
                    <button className="delete-button" onClick={() => deleteRecipe(meal._id)}>
                      Delete Recipe
                    </button>
                  </section>
                </article>
              );
            })
          : state.meals.map((meal) => {
              return (
                <article key={meal.recipeId}>
                  <h1>{meal.title}</h1>
                  <img src={meal.imageUrl} alt="recipe" />

                  <li>Preparation time: {meal.prepTime} minutes</li>
                  <li>Number of servings: {meal.servings}</li>
                  <section className="button-group">
                    {" "}
                    <a href={meal.sourceUrl} target="_blank" rel="noreferrer">
                      Go to Recipe
                    </a>
                    <button className="delete-button" onClick={() => deleteRecipe(meal._id)}>
                      Delete Recipe
                    </button>
                  </section>
                </article>
              );
            })}
        {state.error ? state.error : null}
      </section>
    </main>
  );
}

export default MyMeals;
