require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();
app.use(express.json());
app.use(cors());

const userRoutes = require("./routes/userRoutes");
const recipeRoutes = require("./routes/recipeRoutes");

connectDB();

app.use("/api/users", userRoutes);
app.use("/api/recipes", recipeRoutes);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("API is running...");
});

const HOST = "0.0.0.0";

app.listen(PORT, HOST, () => console.log(`Server running on port ${PORT}`));
