import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { isAuth } from "./helpers/auth";

import MealList from "./MealList";
import RecipeList from "./RecipeList";
import AOS from "aos";
import "aos/dist/aos.css";
AOS.init({
  delay: 500,
  duration: 1200,
  once: false,
});
const apiKey = process.env.REACT_APP_SPOONACULAR_API_KEY;
const edamanAppId = process.env.REACT_APP_EDAMAM_APP_ID;
const edamanApiKey = process.env.REACT_APP_EDAMAM_API_KEY;

function App() {
  const history = useHistory();
  const [mealData, setMealData] = useState(null);
  const [recipe, setRecipe] = useState(null);
  const [calories, setCalories] = useState(2000);
  const [search, setSearch] = useState("breakfast");

  const [error, setError] = useState("");

  const count = Math.floor(Math.random() * 90);

  function getMealData() {
    fetch(`https://api.spoonacular.com/mealplanner/generate?apiKey=${apiKey}&timeFrame=day&targetCalories=${calories}&exclude=cheese`)
      .then((response) => response.json())
      .then((data) => {
        window.scrollTo(0, 0);
        setRecipe(null);
        setMealData(data);
        setCalories(2000);
      })
      .catch(() => {
        setError("Something went wrong");
      });
  }

  function getSingleIngredientRecipe() {
    fetch(`https://api.edamam.com/search?q=${search}&app_id=${edamanAppId}&app_key=${edamanApiKey}&from=${count}&to=${count + 12}`)
      .then((response) => response.json())
      .then((data) => {
        window.scrollTo(0, 0);
        setMealData(null);
        setRecipe(data.hits);
        setSearch("Breakfast");
      })
      .catch(() => {
        setError("Something went wrong");
      });
  }

  return (
    <main /*data-aos="zoom-in"*/>
      {recipe && <RecipeList search={search} recipeData={recipe} />}
      {mealData && <MealList mealData={mealData} />}
      {error && error}
      <section>
        <h1>The Recipe Room</h1>
        <p>Search by calories</p>

        <input type="Number" placeholder="Calories (e.g. 2000)" onChange={(e) => setCalories(e.target.value)} />
        <p>Three recipes totalling calorie amount</p>
        <button onClick={getMealData}>Get Recipes by calories</button>
        <h2>or</h2>
        <p>Search by ingredient / keyword</p>
        <input type="text" placeholder="(e.g. chicken / dinner)" onChange={(e) => setSearch(e.target.value)} />
        <br />
        <button onClick={getSingleIngredientRecipe}>Get Recipes</button>
        <h2>or</h2>
        {isAuth() ? <button onClick={() => history.push("/mymeals")}>View your saved recipes</button> : <button onClick={() => history.push("/login")}>Login to view your saved recipes</button>}
      </section>
    </main>
  );
}

export default App;
