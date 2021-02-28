const express = require("express");
const { getUsers, getUser, updateUser, deleteUser } = require("../controllers/users.controller");
const { createRecipe, getRecipes, getRecipe, updateRecipe, deleteRecipe } = require("../controllers/recipe.controller");
const advancedResults = require("../middleware/advancedResults");
const User = require("../models/auth.model");
const Recipe = require("../models/recipe.model");
const router = express.Router();

//router.use(protect);
//router.use(authorize("admin"));

router.get("/", advancedResults(User), getUsers);
router.get("/recipes/:id", advancedResults(Recipe), getRecipes);
router.post("/recipes", createRecipe);

router
  .route("/:id")
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);

router
  .route("/recipe/:id")
  .get(getRecipe)
  .put(updateRecipe)
  .delete(deleteRecipe);

module.exports = router;
