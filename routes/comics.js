const express = require("express");
const router = express.Router();
const axios = require("axios");

//* Route #1 pour récupérer les infos COMICS depuis l'API Marvel du Réacteur

router.get("/comics", async (req, res) => {
  //Je récupère les query envoyés par la requête venant du front
  const title = req.query.title || "";
  const limit = req.query.limit || "100";
  const skip = req.query.skip || "0";

  //J'interpole ces query dans ma requête à l'API
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${process.env.YOUR_MARVEL_APIKEY}&title=${title}&limit=${limit}&skip=${skip}`
    );
    console.log(response.data);
    res.json(response.data);
  } catch (error) {
    console.log(error.message);
  }
});

//* Route #2 pour récupérer les infos des COMICS ou apparaît un PERSONNAGE en fonction de son ID

router.get("/comics/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics/${id}?apiKey=${process.env.YOUR_MARVEL_APIKEY}`
    );
    res.json(response.data);
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
