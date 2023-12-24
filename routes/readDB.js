// Importer le module express
import express from "express";

// Créer un routeur express
const readDBRouter = express.Router();

// Envoyer la réponse (attention "/" car le reste de l'URL est géré par le routeur "routes.js" à la racine)
readDBRouter.get("/", (req, res) => {
  console.log('lecture de la DB');
  res.send("FAKE NEWS FOR NOW");
});

// Exporter le routeur
export default readDBRouter;