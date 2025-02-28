const express = require("express");
const Recipe = require("../models/Recipe");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
    const { title, description, ingredients, instructions } = req.body;
    const newRecipe = new Recipe({
        title,
        description,
        ingredients,
        instructions,
        user: req.user.id
    });

    await newRecipe.save();
    res.status(201).json(newRecipe);
});

router.get("/", async (req, res) => {
    const recipes = await Recipe.find().populate("user", "name email");
    res.json(recipes);
});

router.get("/:id", async (req, res) => {
    const recipe = await Recipe.findById(req.params.id).populate("user", "name email");
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });

    res.json(recipe);
});

router.delete("/:id", authMiddleware, async (req, res) => {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe || recipe.user.toString() !== req.user.id) {
        return res.status(403).json({ message: "Not authorized" });
    }

    await recipe.deleteOne();
    res.json({ message: "Recipe deleted" });
});

module.exports = router;
