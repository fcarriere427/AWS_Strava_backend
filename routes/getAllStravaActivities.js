// Importer le module express
import express from "express";

// Importer les librairies perso
import { getStravaStats } from "../stravaLib.js";

// Créer un routeur express
const getAllStravaActivitiesRouter = express.Router();

////////////////
// Numéro d'athlète dans Strava
// to do : le récupérer à partir des credentials 
///////////////
const tableName = "StravaDB";

// Envoyer la réponse (attention "/" car le reste de l'URL est géré par le routeur "routes.js" à la racine)
export default getAllStravaActivitiesRouter
  .get("/", async (req, res) => {
    console.log('*** getAllStravaActivities.js');
    var response = await getStravaStats(req.query.id, tableName)
    console.log('response = ' + JSON.stringify(response)); // renvoie un JSON avec les metadata en tête
    console.log('Réponse envoyée');
    res.send(response);
  });