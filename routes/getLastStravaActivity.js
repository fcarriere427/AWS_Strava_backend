// Importer le module express
import express from "express";
// Importer la librairie Strava perso
import getLastActivity from "../stravaLib.js";

// Créer un routeur express
const getLastStravaActivityRouter = express.Router();

// Envoyer la réponse (attention "/" car le reste de l'URL est géré par le routeur "routes.js" à la racine)
export default getLastStravaActivityRouter.get("/", (req, res) => {
  console.log('*** getLastStravaActivity.js : appel de getLastActivity in stravaLib.js');
  getLastActivity()
  .then((response) => {
    res.send(response);
    }
  )
});