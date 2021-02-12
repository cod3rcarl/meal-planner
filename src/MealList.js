import React from "react";
import Meal from "./Meal";

export default function MealList({ mealData }) {
  const nutrients = mealData.nutrients;

  return (
    <main>
      <section className="nutrients">
        <h1>Meal List</h1>

        <h4>
          Nutrition <em>(per total serving)</em>
        </h4>

        <li>Calories: {nutrients.calories.toFixed(0)}</li>
        <li>Carbohydrates: {nutrients.carbohydrates.toFixed(0)}</li>
        <li>Fat: {nutrients.fat.toFixed(0)}</li>
        <li>Protein: {nutrients.protein.toFixed(0)}</li>
      </section>

      <section className="meals">
        {mealData.meals.map((meal) => {
          return <Meal key={meal.id} meal={meal} />;
        })}
      </section>
    </main>
  );
}
