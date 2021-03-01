import React, { useState } from "react";
import { Link } from "react-router-dom";
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
  const [mealData, setMealData] = useState(null);
  const [recipe, setRecipe] = useState(null);
  const [calories, setCalories] = useState(2000);
  const [search, setSearch] = useState("breakfast");
  const [myClass, setMyClass] = useState("container");
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

    setMyClass("containerAfter");
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

    setMyClass("containerAfter");
  }

  return (
    <div className={myClass}>
      <div className="App" data-aos="zoom-in">
        {recipe && <RecipeList search={search} recipeData={recipe} />}
        {mealData && <MealList mealData={mealData} />}
        {error && error}
        <section className="controls">
          <h1>My Meal Plan</h1>
          <div className="center">
            <p>Search by calories</p>
            <input type="Number" placeholder="Calories (e.g. 2000)" onChange={(e) => setCalories(e.target.value)} />
            <p>Get three recipes totalling calorie amount</p>
            <button onClick={getMealData}>Get Recipes by calories</button>
          </div>

          <section className="btn">or</section>
          <div className="center">
            <p>Search by ingredient / keyword</p>
            <input type="text" placeholder="(e.g. chicken / breakfast)" onChange={(e) => setSearch(e.target.value)} />
            <br />
            <button onClick={getSingleIngredientRecipe}>Get Recipes</button>
          </div>

          <section className="btn">or</section>
          {isAuth() ? (
            <Link className="btn" to="/mymeals">
              {" "}
              <button>View your saved recipes</button>
            </Link>
          ) : (
            <Link className="btn" to="/login">
              <button>Login to view your saved recipes</button>
            </Link>
          )}
        </section>
      </div>
    </div>
  );
}

export default App;
