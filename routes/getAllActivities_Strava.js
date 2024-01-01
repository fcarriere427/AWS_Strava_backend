// Importer le module express
import express from "express";

// Importer les librairies perso
import { getAllActivities } from "../stravaLib.js";

// Nom de la table AWS
const tableName = "StravaDB";

// Créer un routeur express
const getAllActivities_Strava_Router = express.Router();

// Envoyer la réponse (attention "/" car le reste de l'URL est géré par le routeur "routes.js" à la racine)
export default getAllActivities_Strava_Router
  .get("/", async (req, res) => {
    console.log('*** getAllActivities_Strava.js');
    console.log('Appel de getAllActivities');
    var response = await getAllActivities(req.query.id, tableName)
    console.log('response = ' + JSON.stringify(response)); // renvoie un JSON avec les metadata en tête
    console.log('Réponse envoyée');
    res.send(response);
  });