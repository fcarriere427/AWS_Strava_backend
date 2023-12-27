// Importer le module express
import express from "express";
// Importer la librairie Strava perso
import strava from "../stravaLib.js";

// Créer un routeur express
const getLastStravaActivityRouter = express.Router();

// Envoyer la réponse (attention "/" car le reste de l'URL est géré par le routeur "routes.js" à la racine)
getLastStravaActivityRouter.get("/", (req, res) => {
  console.log('récupération de la dernière activité Strava');
  strava.getLastActivity()
  .then((response) => {
    res.send(response);
    }
  )
});

// Exporter le routeur
export default getLastStravaActivityRouter;