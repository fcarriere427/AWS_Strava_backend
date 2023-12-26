// Importer le module express
import express from "express";

// Créer un routeur express
const aurevoirRouter = express.Router();

// Envoyer la réponse (attention "/" car le reste de l'URL est géré par le routeur "routes.js" à la racine)
aurevoirRouter.get("/", (req, res) => {
  res.send("au revoir");
});

// Exporter le routeur
export default aurevoirRouter;