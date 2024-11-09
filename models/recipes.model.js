const mongoose = require("mongoose")

const ingredientSchema = new mongoose.Schema({
    name: String,
    quantity: String
})

const recipeSchema = new mongoose.Schema({
    recipeName: {
        type: String,
        required: true
    },
    cuisineType: {
        type: String,
        required: true
    },
    ingredients: [ingredientSchema],
    instructions: [
        {type: String}
    ],
    image: String
})

const Recipes = mongoose.model("Recipes", recipeSchema)

module.exports = {Recipes}
