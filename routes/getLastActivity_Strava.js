// Importer le module express
import express from "express";

// Importer la librairie Strava perso
import getLastActivity from "../stravaLib.js";

// Créer un routeur express
const getLastActivity_Strava_Router = express.Router();

// Envoyer la réponse (attention "/" car le reste de l'URL est géré par le routeur "routes.js" à la racine)
export default getLastActivity_Strava_Router
.get("/", async (req, res) => {
  console.log('*** getLastActivity_Strava.js');
  console.log('Appel de getLastActivity in stravaLib.js');
  var response = await getLastActivity();
  console.log('Réponse envoyée');
  res.send(response);
});