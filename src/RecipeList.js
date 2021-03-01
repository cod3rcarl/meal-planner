import React from "react";
import Recipe from "./Recipe";
import { v4 as uuidv4 } from "uuid";
import { isAuth } from "./helpers/auth";
import { useHistory } from "react-router-dom";
import { ToastContainer } from "react-toastify";
export default function RecipeList({ recipeData, search }) {
  const history = useHistory();

  return (
    <main>
      <section className="nutrients" data-aos="fade-left">
        <h1>{search.toUpperCase()} RECIPES</h1>
        {isAuth() && <button onClick={() => history.push("/mymeals")}>View My Recipes</button>}
      </section>
      <ToastContainer />
      <section className="mealApp">
        {recipeData.map((recipe) => {
          /* Add an id to the edamam recipe to mimic the spoonacular recipe*/
          recipe.recipe = { ...recipe.recipe, id: uuidv4() };
          return <Recipe key={recipe.recipe.id} recipe={recipe.recipe} />;
        })}
      </section>
    </main>
  );
}
