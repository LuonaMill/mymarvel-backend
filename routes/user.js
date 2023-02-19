const express = require("express");
const router = express.Router();

//* Import des packages pour encrypter un password
const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");

//* Import du modèle User
const User = require("../models/User");
const Favorite = require("../models/Favorite");

//* Route #1 je crée une route signup en POST

router.post("/user/signup", async (req, res) => {
  // Je destructure les infos venant du client
  const { username, email, password } = req.body;

  try {
    // Je vérifie si l'email reçu existe déjà en base
    const existingEmail = await User.findOne({ email: email });
    // si c'est le cas, j'informe le client
    if (existingEmail) {
      res
        .status(409)
        .json({ message: "An account is already linked to this email" });

      // si l'email n'existe pas en BDD, je vérifie l'existence de tous les paramètres.
    } else {
      if (!username || !email || !password) {
        res.status(400).json({ message: "Missing parameters" });
        // si tout est OK je crypte le password
      } else {
        const salt = uid2(16);
        const hash = SHA256(salt + password).toString(encBase64);
        const token = uid2(64);
        //puis je crée et sauvegarde mon nouveau user en base
        const newUser = new User({
          account: { username: username },
          email: email,
          salt: salt,
          hash: hash,
          token: token,
        });

        await newUser.save();

        res.status(200).json({
          _id: newUser._id,
          email: newUser.email,
          token: newUser.token,
          account: newUser.account,
        });
      }
    }
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
});

//* Route #2 je crée une route login en POST

router.post("/user/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email: email });
    if (!existingUser) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    const newHash = SHA256(existingUser.salt + password).toString(encBase64);
    if (existingUser.hash === newHash) {
      res.json({
        _id: existingUser._id,
        token: existingUser.token,
        account: existingUser.account,
      });
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
