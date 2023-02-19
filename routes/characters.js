const express = require("express");
const router = express.Router();
const axios = require("axios");

//* Route #1 pour récupérer les infos PERSONNAGES depuis l'API Marvel du Réacteur

router.get("/characters", async (req, res) => {
  //Je récupère les query envoyés par la requête venant du front
  const name = req.query.name || "";
  const limit = req.query.limit || "100";
  const skip = req.query.skip || "0";

  //J'interpole ces query dans ma requête à l'API
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.YOUR_MARVEL_APIKEY}&name=${name}&limit=${limit}&skip=${skip}`
    );
    console.log(response.data);
    res.json(response.data);
  } catch (error) {
    console.log(error.message);
  }
});

//* Route #2 pour récupérer les infos d'un PERSONNAGE en fonction de son ID

router.get("/character/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/character/${id}?apiKey=${process.env.YOUR_MARVEL_APIKEY}`
    );
    res.json(response.data);
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
