// Importer le module express
import express from "express";

// Créer un routeur express
const aurevoirRouter = express.Router();

// Définir la route qui renvoie "au revoir"
aurevoirRouter.get("/aurevoir", (req, res) => {
  res.send("au revoir");
});

// Exporter le routeur
export default aurevoirRouter;