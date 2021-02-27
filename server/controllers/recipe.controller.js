const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
const Recipe = require("../models/recipe.model");

// @description Get all users
// @route GET /api/v1/users
// @access Private/Admin

exports.getRecipes = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @description Get single
// @route GET/api/v1/users:/id
// @access Private/Admin

exports.getRecipe = asyncHandler(async (req, res, next) => {
  const recipe = await Recipe.findById(req.params.id);
  res.status(200).json({ recipe: recipe });
});

// @description Update user
// @route PUT  /api/v1/users/:id
// @access Private/Admin

exports.updateRecipe = asyncHandler(async (req, res, next) => {
  const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({ recipe: recipe });
});

// @description Delete user
// @route DELETE  /api/v1/users/:id
// @access Private/Admin

exports.deleteRecipe = asyncHandler(async (req, res, next) => {
  await Recipe.findByIdAndDelete(req.params.id);
  res.status(200).json({
    success: true,
    message: "Recipe deleted",
  });
});

exports.createRecipe = asyncHandler(async (req, res, next) => {
  //Add User to req.body
  req.body.recipe = req.recipe.id;
  //Check for published bootcamp
  const publishedRecipe = await Recipe.findOne({ recipe: req.recipe.id });
  //If the user is not an admin, they can only add one bootcamp
  if (publishedRecipe) {
    return next(new ErrorResponse(`The recipe with ID ${req.recipe.id} has already added`, 400));
  }
  const recipe = await Recipe.create(req.body);
  res.status(201).json({ success: true, data: recipe });
});
