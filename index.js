const express = require("express")
const app = express()
const cors = require("cors")
//const fs = require("fs")
const corsOptions = {
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200,
  };
const {initialiseDatabase} = require("./db/db.connection")
const {Recipes} = require("./models/recipes.model")

app.use(cors(corsOptions))
app.use(express.json())

initialiseDatabase()

//const jsonData = fs.readFileSync("data.json", "utf-8")
//const recipesData = JSON.parse(jsonData)

// function dataSeeding(){
// for(const recipe of recipesData){
//     const newRecipe = new Recipes({
//         recipeName: recipe.recipeName,
//         cuisineType: recipe.cuisineType,
//         ingredients: recipe.ingredients,
//         instructions: recipe.instructions,
//         image: recipe.image
//     })

//     newRecipe.save()
//     console.log(newRecipe.recipeName)
// }
// }

//dataSeeding()

app.get("/recipes", async (req, res) => {

    try{ const allRecipes = await Recipes.find()

 if(allRecipes.length > 0){
     res.status(200).json(allRecipes)
 }
 else{
     res.status(404).json({error: "No recipe found"})
 }}
 catch(error){
 res.status(500).json({error: "Failed to fetch recipes.Internal Server Error."})
 }
 })

 app.get("/recipes/:id", async (req, res) => {
    const recipeId = req.params.id
    try{
const recipe = await Recipes.findById(recipeId)
if(recipe){
    res.status(200).json(recipe)
}
else{
    res.status(404).json({error: "Recipe Not Found."})
}
    }
    catch(error){
        res.status(500).json({error: "Internal Server Error"})
    }
 })

 app.post("/recipes", async (req, res) => {
    const {recipeName, cuisineType, ingredients, instructions, image} = req.body
    try{
const recipeData = new Recipes({recipeName, cuisineType, ingredients, instructions, image})
await recipeData.save()
if(recipeData){
    res.status(201).json(recipeData)
}
else{
    res.status(400).json({error: "Failed to add recipe."})
}
    }
    catch(error){
res.status(500).json({error: "Internal Server error"})
    }
 })

app.delete("/recipes/:id", async (req, res) => {
    const recipeId = req.params.id
    try{
const deletedRecipe = await Recipes.findByIdAndDelete(recipeId)
if(deletedRecipe){
    res.status(200).json({message: "Recipe Deleted Successfully.", recipe: deletedRecipe})
}
else{
    res.status(404).json({error: "Recipe Not Found"})
}
    }
    catch(error){
res.status(500).json({error: "Internal Server Error."})
    }
})

const PORT = 4000;
app.listen(PORT, () => {
    console.log("Server is running on port", PORT)
})
