import React from "react";
import Meal from "./Meal";
import { isAuth } from "./helpers/auth";
import { useHistory } from "react-router-dom";
import { ToastContainer } from "react-toastify";
export default function MealList({ mealData }) {
  const history = useHistory();

  return (
    <>
      <section>
        <h1>Meal List</h1>

        <h4>
          Nutrition <em>(per total serving)</em>
        </h4>
        <ul>
          {" "}
          <li>Calories: {mealData.nutrients.calories.toFixed(0)}</li>
          <li>Carbohydrates: {mealData.nutrients.carbohydrates.toFixed(0)}</li>
          <li>Fat: {mealData.nutrients.fat.toFixed(0)}</li>
          <li>Protein: {mealData.nutrients.protein.toFixed(0)}</li>
        </ul>
      </section>
      <ToastContainer />
      <div className="mealApp">
        {mealData.meals.map((meal) => {
          return <Meal key={meal.id} meal={meal} />;
        })}
      </div>
      {isAuth() && <button onClick={() => history.push("/mymeals")}>View My Recipes</button>}
    </>
  );
}
