import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { isAuth } from "./helpers/auth";
import About from "./About";
import DropdownMenu from "./components/Dropdown";
import MealList from "./MealList";
import RecipeList from "./RecipeList";
import Modal from "react-modal";
import ReactTooltip from "react-tooltip";

import AOS from "aos";
import "aos/dist/aos.css";
AOS.init({
  delay: 500,
  duration: 1200,
  once: false,
});
Modal.setAppElement("#root");

const apiKey = process.env.REACT_APP_SPOONACULAR_API_KEY;
const edamanAppId = process.env.REACT_APP_EDAMAM_APP_ID;
const edamanApiKey = process.env.REACT_APP_EDAMAM_API_KEY;

function App() {
  const history = useHistory();
  const [mealData, setMealData] = useState(null);
  const [recipe, setRecipe] = useState(null);
  const [calories, setCalories] = useState(2000);
  const [search, setSearch] = useState("breakfast");
  const [modalIsOpen, setModalOpen] = useState(false);
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
      })
      .catch(() => {
        setError("Something went wrong");
      });
  }

  return (
    <main data-aos="zoom-in">
      {recipe && <RecipeList search={search} recipeData={recipe} />}
      {mealData && <MealList mealData={mealData} />}
      {error && error}
      <section>
        {recipe || mealData ? (
          <h1>Search Again</h1>
        ) : (
          <>
            <h1>
              The Recipe Room{" "}
              <span data-tip="About the recipe room">
                <i className="fas fa-question-circle about" onClick={() => setModalOpen(true)}></i>
              </span>
            </h1>{" "}
            <DropdownMenu setModalOpen={setModalOpen} />
          </>
        )}

        <p>Search by calories</p>

        <input type="Number" min="1" placeholder="Calories (e.g. 2000)" onChange={(e) => setCalories(e.target.value)} />
        <p>The results will show you three recipes totaling the calorie number input. (per serving)</p>
        <button onClick={getMealData}>Get Recipes by calories</button>
        <h2>or</h2>
        <p>Search by ingredient / keyword</p>
        <input type="text" placeholder="(e.g. chicken / dinner)" onChange={(e) => setSearch(e.target.value)} />
        <br />
        <button onClick={getSingleIngredientRecipe}>Get Recipes</button>
        <h2>or</h2>
        {isAuth() ? <button onClick={() => history.push("/mymeals")}>View your saved recipes</button> : <button onClick={() => history.push("/login")}>Login to view your saved recipes</button>}
      </section>
      <div>
        {" "}
        <Modal className="modalOpen" isOpen={modalIsOpen} onRequestClose={() => setModalOpen(false)} contentLabel="Welcome Modal">
          <div className="welcomeModal">
            <div className="close">
              <h4 onClick={() => setModalOpen(false)}>Close</h4>
            </div>
            <About />
          </div>
        </Modal>
      </div>
      <ReactTooltip />
    </main>
  );
}

export default App;
