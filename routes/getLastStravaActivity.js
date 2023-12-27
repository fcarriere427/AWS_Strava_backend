// Importer le module express
import express from "express";
// Importer la librairie Strava perso
//const strava = require('../stravaLib.js');
import getLastActivity from "../stravaLib.js";

// Créer un routeur express
const getLastStravaActivityRouter = express.Router();

// Envoyer la réponse (attention "/" car le reste de l'URL est géré par le routeur "routes.js" à la racine)
getLastStravaActivityRouter.get("/", (req, res) => {
  console.log('Express router : récupération de la dernière activité Strava');
  getLastActivity()
  .then((response) => {
    res.send(response);
    }
  )
});

// Exporter le routeur
export default getLastStravaActivityRouter;