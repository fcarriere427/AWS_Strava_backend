// Importer le module express
import express from "express";

// Créer un routeur express
const bonjourRouter = express.Router();

// Envoyer la réponse (attention "/" car le reste de l'URL est géré par le routeur "routes.js" à la racine)
bonjourRouter.get("/", (req, res) => {
  res.send("bonjour");
});

// Exporter le routeur
export default bonjourRouter;