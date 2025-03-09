const express = require('express');
const Recipe = require('../models/Recipe');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, async (req, res) => {
    try {
        const { title, description, image } = req.body;
        const newRecipe = await Recipe.create({ title, description, image });
        res.status(201).json(newRecipe);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

router.get('/', async (req, res) => {
    try {
        const recipes = await Recipe.find();
        res.json(recipes);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) return res.status(404).json({ message: "Recipe not found" });
        res.json(recipe);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) return res.status(404).json({ message: "Recipe not found" });

        await recipe.deleteOne();
        res.json({ message: "Recipe deleted" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
