require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const axios = require("axios");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGODB_URI);

//* J'importe mes routes puis les exécute
const charactersRoutes = require("./routes/characters.js");
const comicsRoutes = require("./routes/comics.js");
const userRoutes = require("./routes/user.js");
const favoritesRoutes = require("./routes/favorites.js");
app.use(charactersRoutes);
app.use(comicsRoutes);
app.use(userRoutes);
app.use(favoritesRoutes);

//*Route de test
app.get("/", async (req, res) => {
  try {
    const response = await axios.get(
      "https://lereacteur-marvel-api.herokuapp.com/"
    );
    console.log(response.data);
  } catch (error) {
    console.log(error.message);
  }
});

app.all("*", (req, res) => {
  res.status(404).json({ message: "This route doesn't exist" });
});

app.listen(4004, () => {
  console.log("Server has started 🚀");
});
