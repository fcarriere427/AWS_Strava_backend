// Importer le module express
import express from "express";

// Importer les librairies perso
import { getAllActivities } from "../stravaLib.js";

// Numéro d'athlète dans Strava // to do : le récupérer à partir des credentials 
const id_athlete = 10830547;

// Créer un routeur express
const getAllActivities_Strava_Router = express.Router();

// Envoyer la réponse (attention "/" car le reste de l'URL est géré par le routeur "routes.js" à la racine)
export default getAllActivities_Strava_Router
  .get("/", async (req, res) => {
    console.log('*** getAllActivities_Strava.js');
    console.log('Appel de getAllActivities');
    var response = await getAllActivities(id_athlete);
    console.log('response = ' + JSON.stringify(response)); // renvoie un JSON avec les metadata en tête
    console.log('Réponse envoyée');
    res.send(JSON.parse(response)); //JSON.parse() car getAllActivities renvoie un entier (le nb d'activités récupérées)
  });