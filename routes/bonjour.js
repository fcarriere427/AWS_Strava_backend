// Importer le module express
import express from "express";

// Créer un routeur express
const bonjourRouter = express.Router();

// Définir la route qui renvoie "bonjour"
bonjourRouter.get("/bonjour", (req, res) => {
  res.send("bonjour");
});

// Exporter le routeur
export default bonjourRouter;