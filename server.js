require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const userRoutes = require("./routes/userRoutes");
const recipeRoutes = require("./routes/recipeRoutes");

const app = express();
app.use(express.json());
app.use(cors({
  origin: "*",
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization"
}));

connectDB();

app.use("/api/users", userRoutes);
app.use("/api/recipes", recipeRoutes);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
