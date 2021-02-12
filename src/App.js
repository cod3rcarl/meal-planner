import React, { useState } from "react";
import MealList from "./MealList";
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
AOS.init({
  delay: 200,
  duration: 1200,
  once: false,
});
const apiKey = process.env.REACT_APP_API_KEY;
function App() {
  const [mealData, setMealData] = useState(null);
  const [calories, setCalories] = useState(2000);
  const [myClass, setMyClass] = useState("container");

  function getMealData() {
    const result = fetch(
      `https://api.spoonacular.com/mealplanner/generate?apiKey=${apiKey}&timeFrame=day&targetCalories=${calories}&exclude=cheese`
    )
      .then((response) => response.json())
      .then((data) => {
        setMealData(data);
      })
      .catch(() => {
        console.log("error");
      });
    console.log(result);
    setMyClass("containerAfter");
  }

  function handleChange(e) {
    setCalories(e.target.value);
  }

  return (
    <div className={myClass}>
      <div className="App" data-aos="fade-up">
        <h1>My Meal Plan</h1>
        <section className="controls">
          <input
            type="number"
            placeholder="Calories (e.g. 2000)"
            onChange={handleChange}
          />
          <button onClick={getMealData}>Get Daily Meal Plan</button>
        </section>
        {mealData && <MealList mealData={mealData} />}
      </div>
    </div>
  );
}

export default App;
