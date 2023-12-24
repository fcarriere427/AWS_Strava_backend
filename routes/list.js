// Importer le module express
import express from "express";

// Créer un routeur express
const router = express.Router();

// Définir la route qui renvoie "bonjour"
router.get("/list", (req, res) => {
  res.send("bonjour");
});

// Exporter le routeur
module.exports = router;